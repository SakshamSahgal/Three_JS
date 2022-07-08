let container;
let camera;
let renderer;
let scene;
let skull;

function init()
{
    container = document.querySelector(".scene"); //get the div which will show the 2d model
    
    //create scene
    scene = new THREE.Scene();
    const fov = 35; //setting field of view
    const aspect = container.clientWidth/container.clientHeight;
    const near = 0.1; //near clipping limit
    const far = 500; //far clipping limit
    
    //camera setup
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far); //adding a pespective camera(not orthographic)
    camera.position.set(0,0,10); //adding a camera position
    const ambient = new THREE.AmbientLight(0x404040,6); //creating ambient lights (illuminates everything equally)

    const mylight = new THREE.DirectionalLight(0xffffff,2);
    mylight.position.set(10,10,100);
    scene.add(mylight);
    scene.add(ambient);

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true , alpha:true});//like in games fix jaggy edges by varying edge opacity and edge blur
    renderer.setSize(container.clientWidth,container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    

    container.appendChild(renderer.domElement);
    
    //load model
    let loader = new THREE.GLTFLoader();
    loader.load("./3D/scene.gltf", function(gltf){
        scene.add(gltf.scene); //adding this model to our scene
        skull = gltf.scene.children[0];
        animate();
    });
} 

function animate()
{
    requestAnimationFrame(animate);
    skull.rotation.z += 0.005;
    renderer.render(scene,camera);
}



init();

