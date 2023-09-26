
import { Inter } from 'next/font/google'

import kA from '../assets/regeA.png';
import kN from '../assets/regeN.png';
import qA from '../assets/quenA.png';
import qN from '../assets/quenN.png';
import nA from '../assets/calA.png';
import nN from '../assets/calN.png';
import bA from '../assets/nebuA.png';
import bN from '../assets/nebuN.png';
import rA from '../assets/turaA.png';
import rN from '../assets/turaN.png';
import pA from '../assets/pionA.png';
import pN from '../assets/pionN.png';
import { useEffect, useState } from 'react';



const inter = Inter({ subsets: ['latin'] })


const matrix = [
  [-3,-5,-4,-2,-3,-1,-4,-5,-3],
  [0,0,0,0,0,0,0,0,0],
  [-6,-6,-6,-6,-6,-6,-6,-6,-6],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [6,6,6,6,6,6,6,6,6],
  [0,0,0,0,0,0,0,0,0],
  [3,5,4,2,3,1,4,5,3],
];

const styling = [
  "flex absolute gap-[2px] left-[0px] top-[0px]",
  "flex absolute gap-[2px] left-[16px] top-[30px]",
  "flex absolute gap-[2px] left-[32px] top-[60px]",
  "flex absolute gap-[2px] left-[48px] top-[90px]",
  "flex absolute gap-[2px] left-[64px] top-[120px]",
  "flex absolute gap-[2px] left-[80px] top-[150px]",
  "flex absolute gap-[2px] left-[96px] top-[180px]",
  "flex absolute gap-[2px] left-[112px] top-[210px]",
  "flex absolute gap-[2px] left-[128px] top-[240px]",
]

const hex1Style = [
  'hexagon bg-orange-400 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon bg-orange-700 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon bg-orange-900 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer'
]
const hex2Style = [
  'hexagon bg-orange-900 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon bg-orange-400 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon bg-orange-700 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer'
]
const hex3Style = [
  'hexagon bg-orange-700 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon bg-orange-900 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon bg-orange-400 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer'
]

export default function Home() {

  return (
    <main
      className={`   relative  ${inter.className}`}
    >
      {
        matrix.map( (row,key)=>{
            console.log(row);
            return(
              <div className={styling[key]}>
                {
                  row.map((col,index)=>{
                    return(
                      <div className={(key%3 === 0) ? hex1Style[(key*9+index)%3] : ((key%3 === 1)? hex2Style[(key*9+index)%3] : hex3Style[(key*9+index)%3])}>
                       <img  height={30} width={30}
                       {...matrix[key][index] === 1 && kA}
                    {...matrix[key][index] === -1 && kN}
                    {...matrix[key][index] === 2 && qA}
                    {...matrix[key][index] === -2 && qN}
                    {...matrix[key][index] === 3 && rA}
                    {...matrix[key][index] === -3 && rN}
                    {...matrix[key][index] === 4 && bA}
                    {...matrix[key][index] === -4 && bN}
                    {...matrix[key][index] === 5 && nA}
                    {...matrix[key][index] === -5 && nN}
                    {...matrix[key][index] === 6 && pA}
                    {...matrix[key][index] === -6 && pN}

                       />
                      </div>         
                    )
                      })
                }
              </div>
            )
        })
      }
    <div className='hexagon  cursor-pointer'></div>

     
    </main>
  )
}
