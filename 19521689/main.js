import './style.css'
import * as THREE from 'three'

const init = () => {
  const scene = new THREE.Scene()
  const aspect = window.innerWidth / window.innerHeight
  const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000)

  // Render scene to the DOM
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff)
  document.getElementById('app').appendChild(renderer.domElement)
  renderer.render(scene, camera)

  // Set camera position and direction
  camera.position.x = 5
  camera.position.y = 2
  camera.position.z = 6
  camera.lookAt(new THREE.Vector3(0, 0.5, 0))

  return [scene, camera, renderer]
}

const createBox = (width, height, depth, name) => {
  const geometry = new THREE.BoxGeometry(width, height, depth)
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = name || ''
  return mesh
}

const createPlane = (size, name) => {
  const geometry = new THREE.PlaneGeometry(size, size)
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material)
  // Rotate plane along X axis by 90 degree
  mesh.rotateX(Math.PI / 2)
  mesh.name = name || ''
  return mesh
}

const animate = (scene, camera, renderer) => {
  requestAnimationFrame(() => animate(scene, camera, renderer))

  // Animation goes here
  let box = scene.getObjectByName('my_box')
  if (box) {
    box.rotation.y += 0.01
    box.rotation.x += 0.01
    box.rotation.z += 0.01
  }

  renderer.render(scene, camera)
}

const main = () => {
  const [scene, camera, renderer] = init()

  const plane = createPlane(4, 'my_plane')
  scene.add(plane)

  const box = createBox(1, 1, 1, 'my_box')
  // Place the box on the plane
  box.position.y = box.geometry.parameters.height / 2 + 1.2
  scene.add(box)

  // Auto update scene
  animate(scene, camera, renderer)
}

main()
