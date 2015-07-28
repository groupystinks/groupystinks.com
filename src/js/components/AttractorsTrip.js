/*
 * AUTHOR: Iacopo Sassarini
 * URL: http://www.chromeexperiments.com/detail/webgl-attractors-trip/
 *
 */
 /* Adopted from webgl-attractors-trip and
 * replace Hopalong Orbit Fractal with Three Ply Orbit Fractal
 */

/*/ TODO: 1. Mobile friendly
*
*/

(function() {
  function AttractorsTripNamespace() {
    /**
     *
     *
    */
    let galaxyImg = require("../../images/galaxy.png");
    let THREE = require('three');


    let VISUALS_VISIBLE = true;

    let SCALE_FACTOR = 1000;
    let CAMERA_BOUND = 200;

    let NUM_POINTS_SUBSET = 20000;
    let NUM_SUBSETS       = 7;
    let NUM_POINTS = NUM_POINTS_SUBSET * NUM_SUBSETS;

    let NUM_LEVELS = 5;
    let LEVEL_DEPTH = 400;

    let TIMELESS_YELLOW_GREENISH = '#345612';

    // Orbit parameters constraints
    let A_MIN = -30;
    let A_MAX = 30;
    let B_MIN = .2;
    let B_MAX = 1.8;
    let C_MIN = 5;
    let C_MAX = 17;
    let D_MIN = 0;
    let D_MAX = 10;
    let E_MIN = 0;
    let E_MAX = 12;

    // requestAnimationFrame ID & setInterval ID
    let spaceTripId, intervalId

    // Orbit parameters
    let a, b, c, d;

    // Orbiut data
    let orbit = {
      subsets: [],
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0,
      scaleX: 0,
      scaleY: 0
    }
    // Initialize data points
    for (let i = 0; i < NUM_SUBSETS; i++){
      let subsetPoints = [];
      for (let j = 0; j < NUM_POINTS_SUBSET; j++){
        subsetPoints[j] = {
          x: 0,
          y: 0,
          vertex: new THREE.Vector3(0,0,0)
        };
      }
      orbit.subsets.push(subsetPoints);
    }

    let container, camera, scene, renderer;

    let mouseX = 0, mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    let speed = .4;
    let rotationSpeed = 0;

    let galaxy = THREE.ImageUtils.loadTexture(galaxyImg);

    function init() {
      container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 3 * SCALE_FACTOR );
      camera.position.z = SCALE_FACTOR/2;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2( 0x000000, 0.0011);

      generateOrbit();

      // Create particle systems
      for (let k = 0; k < NUM_LEVELS; k++){
        for (let s = 0; s < NUM_SUBSETS; s++){
          let geometry = new THREE.Geometry();
          for (let i = 0; i < NUM_POINTS_SUBSET; i++){geometry.vertices.push( orbit.subsets[s][i].vertex);}
          let materials = new THREE.PointCloudMaterial( { size: (3 ), map: galaxy, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
          materials.color.setStyle(TIMELESS_YELLOW_GREENISH);
          let particles = new THREE.PointCloud( geometry, materials );
          particles.myMaterial = materials;
          particles.myLevel = k;
          particles.mySubset = s;
          particles.position.x = 0;
          particles.position.y = 0;
          particles.position.z = - LEVEL_DEPTH * k - (s  * LEVEL_DEPTH / NUM_SUBSETS);
          particles.needsUpdate = 0;
          scene.add(particles);
        }
      }

      // Setup renderer and effects
      renderer = new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1, antialias: false } );
      renderer.setSize( window.innerWidth, window.innerHeight );

      container.appendChild(renderer.domElement);

      // Setup listeners
      document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      document.addEventListener( 'touchstart', onDocumentTouchStart, false );
      document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      window.addEventListener( 'resize', onWindowResize, false );

      // Schedule orbit refeneration
      intervalId = setInterval(updateOrbit, 7000);
    }

    function animate() {
      spaceTripId = requestAnimationFrame(animate);

      if (!!_.last(window.location.href.split('/'))) {
        // stop update orbit
        clearInterval(intervalId);

        // stop AnimationFrame
        cancelAnimationFrame(spaceTripId);

        // stop listening events
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('touchstart', onDocumentTouchStart, false);
        document.removeEventListener('touchmove', onDocumentTouchMove, false);
        window.removeEventListener( 'resize', onWindowResize, false );

        // add some opaque effects
        renderer.setClearColor(0xdddddd, 1)
      }

      render();
    }

    function render() {
      if (camera.position.x >= - CAMERA_BOUND && camera.position.x <= CAMERA_BOUND){
        camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        if (camera.position.x < - CAMERA_BOUND) camera.position.x = -CAMERA_BOUND;
        if (camera.position.x >  CAMERA_BOUND) camera.position.x = CAMERA_BOUND;
      }
      if (camera.position.y >= - CAMERA_BOUND && camera.position.y <= CAMERA_BOUND){
        camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        if (camera.position.y < - CAMERA_BOUND) camera.position.y = -CAMERA_BOUND;
        if (camera.position.y >  CAMERA_BOUND) camera.position.y = CAMERA_BOUND;
      }

      camera.lookAt( scene.position );

      for(let i = 0; i < scene.children.length; i++ ) {
        scene.children[i].position.z +=  speed;
        scene.children[i].rotation.z += rotationSpeed;
        if (scene.children[i].position.z > camera.position.z){
          scene.children[i].position.z = - (NUM_LEVELS -1) * LEVEL_DEPTH;
          if (scene.children[i].needsUpdate == 1){
            scene.children[i].geometry.__dirtyVertices = true;
            scene.children[i].myMaterial.color.setStyle(TIMELESS_YELLOW_GREENISH);
            scene.children[i].needsUpdate = 0;
          }
        }
      }

      renderer.render( scene, camera );
    }

    ///////////////////////////////////////////////
    // Hopalong Orbit Generator
    ///////////////////////////////////////////////
    function updateOrbit(){
      generateOrbit();

      for(let i = 0; i < scene.children.length; i++ ) {
        scene.children[i].needsUpdate = 1;
      }

    }

    function generateOrbit(){
      let x, y, z, x1;
      let idx = 0;

      prepareOrbit();

      // Using local vars should be faster
      let al = a;
      let bl = b;
      let cl = c;
      let dl = d;
      let subsets = orbit.subsets;
      let num_points_subset_l = NUM_POINTS_SUBSET;
      let num_points_l = NUM_POINTS;
      let scale_factor_l = SCALE_FACTOR;

      let xMin = 0, xMax = 0, yMin = 0, yMax = 0;

      for (let s = 0; s < NUM_SUBSETS; s++){

        // Use a different starting point for each orbit subset
        x = s * .005 * (0.5-Math.random());
        y = s * .005 * (0.5-Math.random());

        let curSubset = subsets[s];

        for (let i = 0; i < num_points_subset_l; i++){
          /* Three Ply Factual

          // xn + 1 = yn - |sin(xn)cos(b) + c - xnsin(a + b + c)|
          // yn + 1 = a - xn
          */

          // // Iteration formula (generalization of the Barry Martin's original one)
          // // and replaced sequence with Three Ply Orbit Fractal
          z = Math.abs(Math.sin(x) * Math.cos(bl) + cl - x * Math.sin(al + bl + cl));
          if (x > 0) {x1 = y - z;}
          else if (x == 0) {x1 = y;}
          else {x1 = y + z;}
          y = al - x;
          x = x1 + dl;

          curSubset[i].x = x;
          curSubset[i].y = y;

          if (x < xMin) {xMin = x;}
          else if (x > xMax) {xMax = x;}
          if (y < yMin) {yMin = y;}
          else if (y > yMax) {yMax = y;}

          idx++;
        }
      }

      let scaleX = 2 * scale_factor_l / (xMax - xMin);
      let scaleY = 2 * scale_factor_l / (yMax - yMin);

      orbit.xMin = xMin;
      orbit.xMax = xMax;
      orbit.yMin = yMin;
      orbit.yMax = yMax;
      orbit.scaleX = scaleX;
      orbit.scaleY = scaleY;

      // Normalize and update vertex data
      for (let s = 0; s < NUM_SUBSETS; s++){
        let curSubset = subsets[s];
        for (let i = 0; i < num_points_subset_l; i++){
          curSubset[i].vertex.x = scaleX * (curSubset[i].x - xMin) - scale_factor_l;
          curSubset[i].vertex.y = scaleY * (curSubset[i].y - yMin) - scale_factor_l;
        }
      }
    }

    function prepareOrbit(){
      shuffleParams();
      orbit.xMin = 0;
      orbit.xMax = 0;
      orbit.yMin = 0;
      orbit.yMax = 0;
    }

    function shuffleParams() {
      a = A_MIN + Math.random() * (A_MAX - A_MIN);
      b = B_MIN + Math.random() * (B_MAX - B_MIN);
      c = C_MIN + Math.random() * (C_MAX - C_MIN);
      d = D_MIN + Math.random() * (D_MAX - D_MIN);
    }

    ///////////////////////////////////////////////
    // Event listeners
    ///////////////////////////////////////////////
    function onDocumentMouseMove( event ) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart( event ) {
      if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
      }
    }

    function onDocumentTouchMove( event ) {
      if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
      }
    }

    function onWindowResize( event ) {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    init();
    animate();
  } // AttractorsTripNamespace

  module.exports = AttractorsTripNamespace;
})();
