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


const number = 1;

const matrix = [
[-4],
[-2,-1],
[-5,-4,-5],
[-3,0,0,-3],
[-6,0,-4,0,-6],
[0,-6,0,0,-6,0],
[0,-6,0,-6,0],
[0,0,-6,-6,0,0],
[0,0,-6,0,0],
[0,0,0,0,0,0],
[0,0,0,0,0],
[0,0,0,0,0,0],
[0,0,6,0,0],
[0,0,6,6,0,0],
[0,6,0,6,0],
[0,6,0,0,6,0],
[6,0,4,0,6],
[3,0,0,3],
[5,4,5],
[2,1],
[4],];
const styling = 
["inline-flex gap-[18.75px] absolute top-[0px] left-[214px] ",
"inline-flex gap-[18.75px] absolute top-[18px] left-[187px] ",
"inline-flex gap-[18.75px] absolute top-[37px] left-[160px] ",
"inline-flex gap-[18.75px] absolute top-[55px] left-[133px] ",
"inline-flex gap-[18.75px] absolute top-[74px] left-[106px] ",
"inline-flex gap-[18.75px] absolute top-[92px] left-[79px] ",
"inline-flex gap-[18.75px] absolute top-[111px] left-[106px] ",
"inline-flex gap-[18.75px] absolute top-[129px] left-[79px] ",
"inline-flex gap-[18.75px] absolute top-[148px] left-[106px] ",
"inline-flex gap-[18.75px] absolute top-[166px] left-[79px] ",
"inline-flex gap-[18.75px] absolute top-[185px] left-[106px] ",
"inline-flex gap-[18.75px] absolute top-[204px] left-[79px] ",
"inline-flex gap-[18.75px] absolute top-[222px] left-[106px] ",
"inline-flex gap-[18.75px] absolute top-[241px] left-[79px] ",
"inline-flex gap-[18.75px] absolute top-[259px] left-[106px] ",
"inline-flex gap-[18.75px] absolute top-[278px] left-[79px] ",
"inline-flex gap-[18.75px] absolute top-[296px] left-[106px] ",
"inline-flex gap-[18.75px] absolute top-[315px] left-[133px] ",
"inline-flex gap-[18.75px] absolute top-[333px] left-[160px] ",
"inline-flex gap-[18.75px] absolute top-[352px] left-[187px] ",
"inline-flex gap-[18.75px] absolute top-[370px] left-[214px] ",
]
;





export default function var1() {

  const [game, setGame] = useState(
    {
      matrix :[
        [-4],
        [-2,-1],
        [-5,-4,-5],
        [-3,0,0,-3],
        [-6,0,-4,0,-6],
        [0,-6,0,0,-6,0],
        [0,-6,0,-6,0],
        [0,0,-6,-6,0,0],
        [0,0,-6,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,6,0,0],
        [0,0,6,6,0,0],
        [0,6,0,6,0],
        [0,6,0,0,6,0],
        [6,0,4,0,6],
        [3,0,0,3],
        [5,4,5],
        [2,1],
        [4],],
      whoTurn: true,
      startPoint: false,
      endPoint: false,
      pieceSelected: [-1,-1],
      pieceToMove: [-1,-1]   
    }
  );

    const moves = {
      p:{
        oneUp: [2,0],
        twoUp: [4,0],
        cptLeft: [1,0],
        cptRight:[1,1],
      }
        
      
    }

  useEffect(()=>{console.log(game.matrix)},[game])

  const gameLogic = (row,col) => {
    console.log(row+ ' ' + col + ' ' + game.startPoint); 

    if(game.startPoint === false && game.matrix[row][col] === 0)
    {
      console.log('none');
      return;
    }
    if(game.startPoint === false)
    {
      setGame({...game, startPoint:true, pieceSelected:[row,col]});
    }
    if(game.startPoint === true)
    {
      
      let dest = game.matrix[row][col];
      let piece = game.matrix[game.pieceSelected[0]][game.pieceSelected[1]];
      console.log('piece selected ' + piece);
      const copyMat = game.matrix;
      let cpy = copyMat[game.pieceSelected[0]][game.pieceSelected[1]];

      switch(piece)
      {
        case -6:{
           let dist = [0,0];
           let piecePos = game.pieceSelected;
           dist[0] = row - game.pieceSelected[0];
           dist[1] = col - game.pieceSelected[1];
           console.log(dist);
           if(dist[0] === 2 && dist[1] === 0 && dest === 0)
          {
              copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
              copyMat[row][col] = cpy
          }
          else if(dist[0] === 4 && dist[1] === 0 && dest === 0 && game.matrix[game.pieceSelected[0]+2][game.pieceSelected[1]] === 0)
          {
              copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
              copyMat[row][col] = cpy
          }
          else if(dist[0] === 1 && dist[1] === 0 && game.matrix[game.pieceSelected[0]+1][game.pieceSelected[1]] > 0)
          {
           
            copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
            copyMat[row][col] = cpy
          }
          else if((piecePos[0] <=4 || (piecePos[0]<16 &&piecePos[0] > 4 && piecePos[0]%2 == 0))  &&dist[0] === 1 && dist[1] === 1 && game.matrix[game.pieceSelected[0]+1][game.pieceSelected[1]+1] > 0)
          {
           
            copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
            copyMat[row][col] = cpy
          }
          else if((piecePos[0] >=16 || (piecePos[0]<16 &&piecePos[0] > 4 && piecePos[0]%2 == 1))  &&dist[0] === 1 && dist[1] === -1 && game.matrix[game.pieceSelected[0]+1][game.pieceSelected[1]-1] > 0)
          {
           
            copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
            copyMat[row][col] = cpy
          }
        }
        case 6:{
          let dist = [0,0];
          let piecePos = game.pieceSelected;
          dist[0] = row - game.pieceSelected[0];
          dist[1] = col - game.pieceSelected[1];
          console.log(dist);

          if(piecesPos[0] === 2 && piecePos[1] === 1 && row === 0 && col === 0 )
          {
            copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
             copyMat[row][col] = cpy
          }

          if(piecePos[0] === 3 && piecePos[0] === 1 && row === 2 && col === 0)
          {
            copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
             copyMat[row][col] = cpy
          }

          if(piecePos[0] === 3 && piecePos[0] === 2 && row === 2 && col === 1)
          {
            copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
             copyMat[row][col] = cpy
          }

          if(piecePos[0] === 5)

          if(dist[0] === -2 && dist[1] === 0 && dest === 0)
         {
             copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
             copyMat[row][col] = cpy
         }
         else if(dist[0] === -4 && dist[1] === 0 && dest === 0 && game.matrix[game.pieceSelected[0]-2][game.pieceSelected[1]] === 0)
         {
             copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
             copyMat[row][col] = cpy
         }
         else if(dist[0] === -1 && dist[1] === 0 && game.matrix[game.pieceSelected[0]-1][game.pieceSelected[1]] < 0)
         {
          
           copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
           copyMat[row][col] = cpy
         }
         else if((piecePos[0] <=4 || (piecePos[0]<16 &&piecePos[0] > 4 && piecePos[0]%2 === 1))  &&dist[0] === -1 && dist[1] === -1 && game.matrix[game.pieceSelected[0]-1][game.pieceSelected[1]-1] < 0)
         {
          
           copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
           copyMat[row][col] = cpy
         }
         else if((piecePos[0] >=16 || (piecePos[0]<16 &&piecePos[0] > 4 && piecePos[0]%2 === 0))  &&dist[0] === -1 && dist[1] === 1 && game.matrix[game.pieceSelected[0]-1][game.pieceSelected[1]+1] < 0)
         {
          
           copyMat[game.pieceSelected[0]][game.pieceSelected[1]] = 0;
           copyMat[row][col] = cpy
         }
       }
       
       case 5:{

        let dist = [0,0];
        let piecePos = game.pieceSelected;
        dist[0] = row - game.pieceSelected[0];
        dist[1] = col - game.pieceSelected[1];



       }
        
      }


      
      
      
      setGame({...game, startPoint:false, pieceSelected:[-1,-1], matrix:copyMat});
    }
  }


  const colorPick = (row,col) =>{
    
    if(row%3 === 0) return 'bg-orange-500';
    if(row%3 === 1) return 'bg-orange-300';
    if(row%3 === 2) return 'bg-orange-100';
  }


  return (
    <div
      className={`  relative  ${inter.className}`}
    >
    {
      game.matrix.map((row,key)=>{

        return (
          <div className={styling[key]}>
            {row.map((column,index)=>{
            
            
            return(
              
                <div onClick={()=>{gameLogic(key,index)}} className={` ${colorPick(key,index)} flex justify-center items-center hover:scale-90 transition-all duration-150 cursor-pointer  hexagon  `}>
                  <div className='h-[75%] w-[75%]'>
                    <img
                    {...game.matrix[key][index] === 1 && kA}
                    {...game.matrix[key][index] === -1 && kN}
                    {...game.matrix[key][index] === 2 && qA}
                    {...game.matrix[key][index] === -2 && qN}
                    {...game.matrix[key][index] === 3 && rA}
                    {...game.matrix[key][index] === -3 && rN}
                    {...game.matrix[key][index] === 4 && bA}
                    {...game.matrix[key][index] === -4 && bN}
                    {...game.matrix[key][index] === 5 && nA}
                    {...game.matrix[key][index] === -5 && nN}
                    {...game.matrix[key][index] === 6 && pA}
                    {...game.matrix[key][index] === -6 && pN}
                    />
                  </div>
                </div>
              
            )
            })}
          </div>
        
        )
      })
    }
    <div className='hexagon bg-red-600 cursor-pointer'></div>

     
    </div>
  )
}
