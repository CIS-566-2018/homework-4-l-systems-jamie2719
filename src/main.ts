import {vec3} from 'gl-matrix';
import {mat4, vec4} from 'gl-matrix';
import * as Stats from 'stats-js';
import * as DAT from 'dat-gui';
import Icosphere from './geometry/Icosphere';
import Square from './geometry/Square';
import Cube from './geometry/Cube';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import Camera from './Camera';
import {setGL} from './globals';
import ShaderProgram, {Shader} from './rendering/gl/ShaderProgram';
import { print } from 'util';
import * as OBJ from 'webgl-obj-loader';
import MeshDrawable from './geometry/MeshDrawable';
//import stringToLinkedList from './LSystem/CharNode';
//import linkedListToString from './LSystem/CharNode';
import LSystem from './LSystem/LSystem';
import CharNode from './LSystem/CharNode';

// Define an object with application parameters and button callbacks
// This will be referred to by dat.GUI's functions that add GUI elements.
const controls = {
  tesselations: 5,
  Red: 1,
  Green: 0,
  Blue: 1,
  Shader: 'Lambert'
};

let icosphere: Icosphere;
let square: Square;
let cube: Cube;
let currTime: number = 0;
let meshDrawable : MeshDrawable;
let lsystem: LSystem;

function loadScene() {
  // icosphere = new Icosphere(vec3.fromValues(0, 0, 0), 1, controls.tesselations);
  // icosphere.create();
  // square = new Square(vec3.fromValues(0, 0, 0));
  // square.create();
  //  cube = new Cube(vec3.fromValues(0, 0, 0));
  //  cube.create();

  meshDrawable = new MeshDrawable(vec3.fromValues(0, 0, 0));
  meshDrawable.create();
  lsystem = new LSystem("HX", 5);
  lsystem.doIterations();

}


function main() {
  // var head = CharNode.stringToLinkedList("HX");
  // console.log(head);//CharNode.linkedListToString(head));
  
  //printLinkedList(head);


  // Initial display for framerate
  const stats = Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  // Add controls to the gui
  const gui = new DAT.GUI();
  gui.add(controls, 'tesselations', 0, 8).step(1);
  gui.add(controls, 'Red', 0, 1).step(.05);
  gui.add(controls, 'Green', 0, 1).step(.05);
  gui.add(controls, 'Blue', 0, 1).step(.05);
  gui.add(controls, 'Shader', ['Lambert', 'Custom']);

  // get canvas and webgl context
  const canvas = <HTMLCanvasElement> document.getElementById('canvas');
  const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
  if (!gl) {
    alert('WebGL 2 not supported!');
  }
  // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
  // Later, we can import `gl` from `globals.ts` to access it
  setGL(gl);

  // Initial call to load scene
  loadScene();

  const camera = new Camera(vec3.fromValues(0, 0, 5), vec3.fromValues(0, 0, 0));

  const renderer = new OpenGLRenderer(canvas);
  renderer.setClearColor(0.2, 0.2, 0.2, 1);
  gl.enable(gl.DEPTH_TEST);

  const lambert = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/lambert-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/lambert-frag.glsl')),
  ]);


  // This function will be called every frame
  function tick() {
    lambert.setTime(currTime);
    currTime++;
    camera.update();
    stats.begin();
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    let color = vec4.fromValues(controls.Red, controls.Green, controls.Blue, 1);  
    lambert.setGeometryColor(color);
    renderer.clear();
    if(controls.Shader == 'Lambert') {
      renderer.render(camera, lambert, [
        //icosphere,
        //square,
        //cube
        meshDrawable
      ]);
    }
    stats.end();

    // Tell the browser to call `tick` again whenever it renders a new frame
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.setAspectRatio(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
  }, false);

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.setAspectRatio(window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();

  // Start the render loop
  tick();
}

main();



//load in one copy of primitive
//
