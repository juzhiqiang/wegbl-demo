/**
 * 获取 WebGL 上下文
 *
 * @param canvas HTMLCanvasElement 对象
 * @param debug 是否打印 WebGL 上下文到控制台
 * @returns WebGLRenderingContext 对象，若无法获取则返回 null
 */
function getWebGLContext(canvas, debug = false) {
  const gl = canvas.getContext("webgl");
  if (debug) {
    console.log(gl);
  }
  return gl ? gl : null;
}
/**
 * 初始化着色器
 * @param gl WebGL上下文
 * @param vertexShaderSource 顶点着色器源代码
 * @param fragmentShaderSource 片元着色器源代码
 * @returns 成功返回true，失败返回false
 */
function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log("Failed to create program");
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}

/**
 * 创建 WebGL 程序
 *
 * @param {WebGLRenderingContext} gl - WebGL 渲染上下文
 * @param {string} vshader - 顶点着色器源代码
 * @param {string} fshader - 片段着色器源代码
 * @returns {WebGLProgram} - WebGL 程序对象
 */
function createProgram(gl, vshader, fshader) {
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) return null;

  // Create a program object
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log("Failed to link program: " + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * 加载着色器
 *
 * @param gl WebGL渲染上下文
 * @param type 着色器类型，可选值为gl.VERTEX_SHADER或gl.FRAGMENT_SHADER
 * @param source 着色器源代码
 * @returns 返回着色器对象，若创建或编译失败则返回null
 */
function loadShader(gl, type, source) {
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log("unable to create shader");
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // 编译shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log("Failed to compile shader: " + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
