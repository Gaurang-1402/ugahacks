import Head from 'next/head'
import Image from "next/image"
import Link from 'next/link'
import React, { Suspense, useRef, useState } from "react"
import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { proxy, useSnapshot } from "valtio"

const state = proxy({
  current: null,
})

function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/human_brain/scene.gltf')
  const [hovered, set] = useState(null)

  console.log(hovered)
  return (
    <group ref={group} {...props} dispose={null}
      //@ts-ignore
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      //@ts-ignore
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
        <mesh geometry={nodes.mesh_1.geometry} material={nodes.mesh_1.material} />
        <mesh geometry={nodes.mesh_2.geometry} material={nodes.mesh_2.material} />
        <mesh geometry={nodes.mesh_3.geometry} material={nodes.mesh_3.material} />
        <mesh geometry={nodes.mesh_4.geometry} material={nodes.mesh_4.material} />
        <mesh geometry={nodes.mesh_5.geometry} material={nodes.mesh_5.material} />
        <mesh geometry={nodes.mesh_6.geometry} material={nodes.mesh_6.material} />
        <mesh geometry={nodes.mesh_7.geometry} material={nodes.mesh_7.material} />
        <mesh geometry={nodes.mesh_8.geometry} material={nodes.mesh_8.material} />
        <mesh geometry={nodes.mesh_9.geometry} material={nodes.mesh_9.material} />
        <mesh geometry={nodes.mesh_10.geometry} material={nodes.mesh_10.material} />
        <mesh geometry={nodes.mesh_11.geometry} material={nodes.mesh_11.material} />
        <mesh geometry={nodes.mesh_12.geometry} material={nodes.mesh_12.material} />
        <mesh geometry={nodes.mesh_13.geometry} material={nodes.mesh_13.material} />
        <mesh geometry={nodes.mesh_14.geometry} material={nodes.mesh_14.material} />
      </group>
    </group>
  )
}

function Details() {

  const snap = useSnapshot(state)
  if (snap.current === "Human_Brains") {
    return (
      <div className="h-full md:flex md:flex-col md:justify-center">
        <h1 className="text-3xl uppercase">Frontal Lobe</h1>
        <h1 className="text-xl ">Each side of your brain contains four lobes. The frontal lobe is important for cognitive functions and control of voluntary movement or activity.</h1>
      </div>
    )
  }
  else {
    return (
      <div className="h-full md:flex md:flex-col md:justify-center">
        <h1 className="text-2xl tracking-wider">Click on diffrent parts of 3D model to know more</h1>
        <p className="self-center mx-8 text-xl tracking-wide text-justify">To view the 3D model in AR, scan the QR code or click on the button below.</p>

        <div className="grid justify-center grid-cols-1 gap-2 pb-8 mx-8 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex p-6 text-6xl rounded-xl h-48 w-48">
            <Image width="250" height="250" src="/animalCell.png" alt="" />
          </div>
          <a href="https://go.echo3d.co/iJmt" target="_blank" rel="noreferrer">
            <button className="h-12 px-8 ml-8 text-base font-semibold tracking-wider text-white border rounded-full shadow-sm mt-16 bg-red-50 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:shadow-lg">View in AR</button>
          </a>
        </div>
      </div>
    )
  }
}

export default function Brain() {
  return (
    <>

      <Head>
        <title>Human Brain | Biolearn</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-4 bg-tertiary text-white font-bold">

        <Link href="/bio" passHref><span className="ml-8 cursor-pointer">Go Back</span></Link>

        <div className="grid w-full py-10 place-items-center">
          <h1 className="pb-2 text-5xl font-semibold tracking-wide lg:text-6xl">
            Human Brain
          </h1>
          <div className="inline-flex mt-2 h-1 bg-secondary rounded-full w-96"></div>
          <div className="text-justify text-xl w-86 mt-2 mx-4 md:mx-44">The human brain is the central organ of the human nervous system, and with the spinal cord makes up the central nervous system. The brain consists of the cerebrum, the brainstem and the cerebellum. It controls most of the activities of the body, processing, integrating, and coordinating the information it receives from the sense organs, and making decisions as to the instructions sent to the rest of the body.</div>
        </div>

        <div className="md:grid md:grid-cols-3 md:pr-15 pr-1">

          <div className="w-full h-screen px-4 outline-none md:col-span-2 lg:block cursor-grab">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
              <ambientLight intensity={0.1} />
              <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
              <Suspense fallback={null}>
                <Model scale={0.5} />
                <Environment preset="city" />
                <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
              </Suspense>
              <OrbitControls autoRotate />
            </Canvas>
          </div>

          <div className="mt-56 md:mt-0 md:col-span-1 p-4">
            <Details />
          </div>

        </div>

      </div>

    </>
  )
}
