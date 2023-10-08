"use client"

// Game functionality explained
// 'game' object is used to store the actual state of the table (.matrix)
// the possible moves you can make with a piece (.posibleMove)
// also a table with all squares which the enemy pieces covers (.isInCheck)
// enpasant features is also covered

// 'gameLogic' function is used to update the game object with a new move
// 'makePosibleMove' check the possible movesof a piece
// 'makeIsInCheck' verify if someone is in check
// 'verifMate' verify if someone is mated
// 'verifPosibleMove' is used to check if a move don't produce a self check
// 'resetGame' is used for reseting the game
// 'secToMin' is used to transform seconds to minutes for the timers

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
import gol from '../assets/gol.png';

import { useEffect, useState } from 'react';


 const inter = Inter({ subsets: ['latin'] });


export default function Home() {

  const [seconds1, setSeconds1] = useState(600)
  const [seconds2, setSeconds2] = useState(600)

  const [winner,setWinner] = useState(0);
  const emptyMat = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ];

  let enpasObj = {
    canEnpas:false,
    move:[-1,-1],
    deleted:[-1,-1],
  }

 const [game,setGame] = useState({
  matrix:[
    [-3,-5,-4,-2,-4,-1,-4,-5,-3],
    [0,0,0,0,0,0,0,0,0],
    [-6,-6,-6,-6,-6,-6,-6,-6,-6],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [6,6,6,6,6,6,6,6,6],
    [0,0,0,0,0,0,0,0,0],
    [3,5,4,2,4,1,4,5,3],
  ],
  posibleMove:[
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ],
  isInCheck:[
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ],
  check: false,
  firstSel:[-1,-1],
  isFirstSel: false,
  secondSel:[-1,-1],
  isSecondSel: false,
  whosTurn: true,
  started: false,
  lastMove:{
    piece: -1,
    from: [-1,-1],
    to: [-1,-1],
  },
  enpas:{
    canEnpas: false,
    move:[-1,-1],
    deleted:[-1,-1]
  }
 });

 useEffect(()=>{
  
 },[game])

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

const bDist = [
  [-1,-1],
  [-1,2],
  [-2,1],
  [2,-1],
  [1,-2],
  [1,1],
  [0,3],
  [0,-3],

];

const rDist = [
  [-1,0],
  [1,0],
  [0,1],
  [0,-1],
  [-1,1],
  [1,-1],
]
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
  'hexagon relative bg-orange-400 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon relative bg-orange-700 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon relative bg-orange-900 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer'
]
const hex2Style = [
  'hexagon relative bg-orange-900 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon relative bg-orange-400 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon relative bg-orange-700 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer'
]
const hex3Style = [
  'hexagon relative bg-orange-700 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon relative bg-orange-900 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer',
  'hexagon relative bg-orange-400 hover:scale-90 transition-all duration-200 flex h-[75%] w-[75%] cursor-pointer'
]


  const makeIsInCheck = (who) =>{
    
    let iisInCheck = game.isInCheck;

    for(let i = 0; i<9; i++)
      for(let j = 0 ; j<9; j++)
        iisInCheck[i][j] = 0;

    for(let i = 0 ; i< 9 ;i++)
      for(let j = 0 ; j<9 ; j++)
    if(game.matrix[i][j]*who > 0)
    {let fRow = i;
    let fCol = j;
    switch(game.matrix[i][j]){
      case -6:
    
          if(fCol >= 2 )
          {
            iisInCheck[fRow+1][fCol-2] = 1;
          }
          if(fCol <= 7 )
          {
            iisInCheck[fRow+1][fCol+1] = 1;
          }
          
                          
         break; 
      
    
      case 6 :
        
          if(fCol >= 2 )
          {
            iisInCheck[fRow-1][fCol-1] = 1;
          }
          if(fCol <= 7 )
          {
            iisInCheck[fRow+-1][fCol+2] = 1;
          }
           
        break;   
      
        case -5:
          if(fRow+2 <=8 && fCol+1 <=8 )
          {
            iisInCheck[fRow+2][fCol+1] = 1;
          }
          if(fRow+3 <=8 && fCol-1 >=0 )
          {
            iisInCheck[fRow+3][fCol-1] = 1;
          }
          if(fRow+2 <=8 && fCol-3 >=0 )
          {
            iisInCheck[fRow+2][fCol-3] = 1;
          }
          if(fRow+3 <=8 && fCol-2 >=0 )
          {
            iisInCheck[fRow+3][fCol-2] = 1;
          }
          if(fRow+1 <=8 && fCol+2<=8 )
          {
            iisInCheck[fRow+1][fCol+2] = 1;
          }
          if(fRow-1 >=0 && fCol+3<=8 )
          {
            iisInCheck[fRow-1][fCol+3] = 1;
          }
          if(fRow+1 <= 8 && fCol-3 >=0 )
          {
            iisInCheck[fRow+1][fCol-3] = 1;
          }
          if(fRow-1 >=0 && fCol-2 >= 0 ){
            iisInCheck[fRow-1][fCol-2] = 1;
          }
          if(fRow-2 >= 0 && fCol-1 >= 0 ){
            iisInCheck[fRow-2][fCol-1] = 1;
          }
          if(fRow-3 >= 0 && fCol+1 <= 8 ){
            iisInCheck[fRow-3][fCol+1] = 1;
          }
          if(fRow-3>= 0 && fCol+2 <= 8 ){
            iisInCheck[fRow-3][fCol+2] = 1;
          }
          if(fRow-2 >= 0 && fCol+3 <= 8 ){
            iisInCheck[fRow-2][fCol+3] = 1;
          }
          
          break;
        case 5:
          if(fRow+2 <=8 && fCol+1 <=8 )
          {
            iisInCheck[fRow+2][fCol+1] = 1;
          }
          if(fRow+3 <=8 && fCol-1 >=0 )
          {
            iisInCheck[fRow+3][fCol-1] = 1;
          }
          if(fRow+2 <=8 && fCol-3 >=0)
          {
            iisInCheck[fRow+2][fCol-3] = 1;
          }
          if(fRow+3 <=8 && fCol-2 >=0)
          {
            iisInCheck[fRow+3][fCol-2] = 1;
          }
          if(fRow+1 <=8 && fCol+2<=8 )
          {
            iisInCheck[fRow+1][fCol+2] = 1;
          }
          if(fRow-1 >=0 && fCol+3<=8 )
          {
            iisInCheck[fRow-1][fCol+3] = 1;
          }
          if(fRow+1 <= 8 && fCol-3 >=0 )
          {
            iisInCheck[fRow+1][fCol-3] = 1;
          }
          if(fRow-1 >=0 && fCol-2 >= 0 ){
            iisInCheck[fRow-1][fCol-2] = 1;
          }
          if(fRow-2 >= 0 && fCol-1 >= 0 ){
            iisInCheck[fRow-2][fCol-1] = 1;
          }
          if(fRow-3 >= 0 && fCol+1 <= 8  ){
            iisInCheck[fRow-3][fCol+1] = 1;
          }
          if(fRow-3>= 0 && fCol+2 <= 8 ){
            iisInCheck[fRow-3][fCol+2] = 1;
          }
          if(fRow-2 >= 0 && fCol+3 <= 8 ){
            iisInCheck[fRow-2][fCol+3] = 1;
          }
          break;
        case -4:
          
          
          for( let i = 0 ; i<8 ; i++)
          {
            let nRow = fRow;
          let nCol = fCol;
            while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
              nRow = nRow + bDist[i][0];
              nCol = nCol + bDist[i][1];
            }
            
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              )
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
          break;
        case 4:
          
          
          for( let i = 0 ; i<8 ; i++)
          {
            let nRow = fRow;
          let nCol = fCol;
            while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
              nRow = nRow + bDist[i][0];
              nCol = nCol + bDist[i][1];
            }
            
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              )
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
          break;
      case 3:
          for(let i = 0 ; i< 6; i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
              iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
              nRow = nRow + rDist[i][0];
              nCol = nCol + rDist[i][1];
              }
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
                && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
                )
                iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }
        break;
      case -3:
        for(let i = 0 ; i< 6; i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
              iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
              nRow = nRow + rDist[i][0];
              nCol = nCol + rDist[i][1];
              }
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
                && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
               )
                iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }
        break;
      case 2:

      for(let i = 0 ; i< 6; i++)
      {
        let nRow = fRow;
        let nCol = fCol;
        while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
          && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
          && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
          iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          nRow = nRow + rDist[i][0];
          nCol = nCol + rDist[i][1];
          }
        if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
            && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
            )
            iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
      }

      for( let i = 0 ; i<8 ; i++)
          {
            let nRow = fRow;
          let nCol = fCol;
            while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
              nRow = nRow + bDist[i][0];
              nCol = nCol + bDist[i][1];
            }
            
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              )
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
        break;
      case -2:
        for( let i = 0 ; i<8 ; i++)
        {
          let nRow = fRow;
        let nCol = fCol;
          while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
            && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
            && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
            iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
            nRow = nRow + bDist[i][0];
            nCol = nCol + bDist[i][1];
          }
          
          if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
            && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
            )
            iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
        }
        for(let i = 0 ; i< 6; i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
              iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
              nRow = nRow + rDist[i][0];
              nCol = nCol + rDist[i][1];
              }
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
                && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
                )
                iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }

        break;
        case 1:
          for(let i = 0; i<6 ;i++)
        {
          let nRow = fRow;
            let nCol = fCol;
          if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
            && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
            
            ){
            iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }
        }
        for(let  i = 0  ;i<6  ;i++)
        {
          let nRow = fRow;
            let nCol = fCol;
          if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
            && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
            
           ){
            iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
        }
          break;
        case -1:
          for(let i = 0; i<6 ;i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              
              ){
              iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
            }
          }
          for(let  i = 0  ;i<6  ;i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              
             ){
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
            }
          }
          break;
        default:
          break;
        
  }}
  
  let isCheck = false;
  for(let i = 0 ; i<9 ; i++)
    for(let j = 0 ; j<9; j++)
    if(game.matrix[i][j] === who && iisInCheck[i][j] === 1) isCheck = true;
  setGame({...game, isInCheck:iisInCheck});
}

  const verifCheck = () =>{
    let who = game.whosTurn? 1 : -1
    let ok = 0
    for(let i = 0 ; i<9 ; i++)
      for(let j = 0 ; j<9; j++)
        if(game.matrix[i][j] === who && game.isInCheck[i][j] === 1) return true
    return false  
  }

  const verifPosibleMove = (pRow,pCol,dRow,dCol,who) =>{
    let mat = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ]
    for(let i = 0 ; i< 9 ; i++)
      for(let j = 0; j<9; j++)
        mat[i][j] = game.matrix[i][j]
    mat[dRow][dCol] = game.matrix[pRow][pCol]
    mat[pRow][pCol] = 0

    let iisInCheck = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];

    

    for(let i = 0 ; i< 9 ;i++)
      for(let j = 0 ; j<9 ; j++)
    if(mat[i][j]*who*(-1) > 0)
    {let fRow = i;
    let fCol = j;
    switch(mat[i][j]){
      case -6:
    
          if(fCol >= 2 )
          {
            iisInCheck[fRow+1][fCol-2] = 1;
          }
          if(fCol <= 7 )
          {
            iisInCheck[fRow+1][fCol+1] = 1;
          }
          
                          
         break; 
      
    
      case 6 :
        
          if(fCol >= 2 )
          {
            iisInCheck[fRow-1][fCol-1] = 1;
          }
          if(fCol <= 7 )
          {
            iisInCheck[fRow+-1][fCol+2] = 1;
          }
           
        break;   
      
        case -5:
          if(fRow+2 <=8 && fCol+1 <=8 )
          {
            iisInCheck[fRow+2][fCol+1] = 1;
          }
          if(fRow+3 <=8 && fCol-1 >=0 )
          {
            iisInCheck[fRow+3][fCol-1] = 1;
          }
          if(fRow+2 <=8 && fCol-3 >=0 )
          {
            iisInCheck[fRow+2][fCol-3] = 1;
          }
          if(fRow+3 <=8 && fCol-2 >=0 )
          {
            iisInCheck[fRow+3][fCol-2] = 1;
          }
          if(fRow+1 <=8 && fCol+2<=8 )
          {
            iisInCheck[fRow+1][fCol+2] = 1;
          }
          if(fRow-1 >=0 && fCol+3<=8 )
          {
            iisInCheck[fRow-1][fCol+3] = 1;
          }
          if(fRow+1 <= 8 && fCol-3 >=0 )
          {
            iisInCheck[fRow+1][fCol-3] = 1;
          }
          if(fRow-1 >=0 && fCol-2 >= 0 ){
            iisInCheck[fRow-1][fCol-2] = 1;
          }
          if(fRow-2 >= 0 && fCol-1 >= 0 ){
            iisInCheck[fRow-2][fCol-1] = 1;
          }
          if(fRow-3 >= 0 && fCol+1 <= 8 ){
            iisInCheck[fRow-3][fCol+1] = 1;
          }
          if(fRow-3>= 0 && fCol+2 <= 8 ){
            iisInCheck[fRow-3][fCol+2] = 1;
          }
          if(fRow-2 >= 0 && fCol+3 <= 8 ){
            iisInCheck[fRow-2][fCol+3] = 1;
          }
          
          break;
        case 5:
          if(fRow+2 <=8 && fCol+1 <=8 )
          {
            iisInCheck[fRow+2][fCol+1] = 1;
          }
          if(fRow+3 <=8 && fCol-1 >=0 )
          {
            iisInCheck[fRow+3][fCol-1] = 1;
          }
          if(fRow+2 <=8 && fCol-3 >=0)
          {
            iisInCheck[fRow+2][fCol-3] = 1;
          }
          if(fRow+3 <=8 && fCol-2 >=0)
          {
            iisInCheck[fRow+3][fCol-2] = 1;
          }
          if(fRow+1 <=8 && fCol+2<=8 )
          {
            iisInCheck[fRow+1][fCol+2] = 1;
          }
          if(fRow-1 >=0 && fCol+3<=8 )
          {
            iisInCheck[fRow-1][fCol+3] = 1;
          }
          if(fRow+1 <= 8 && fCol-3 >=0 )
          {
            iisInCheck[fRow+1][fCol-3] = 1;
          }
          if(fRow-1 >=0 && fCol-2 >= 0 ){
            iisInCheck[fRow-1][fCol-2] = 1;
          }
          if(fRow-2 >= 0 && fCol-1 >= 0 ){
            iisInCheck[fRow-2][fCol-1] = 1;
          }
          if(fRow-3 >= 0 && fCol+1 <= 8  ){
            iisInCheck[fRow-3][fCol+1] = 1;
          }
          if(fRow-3>= 0 && fCol+2 <= 8 ){
            iisInCheck[fRow-3][fCol+2] = 1;
          }
          if(fRow-2 >= 0 && fCol+3 <= 8 ){
            iisInCheck[fRow-2][fCol+3] = 1;
          }
          break;
        case -4:
          
          
          for( let i = 0 ; i<8 ; i++)
          {
            let nRow = fRow;
          let nCol = fCol;
            while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && mat[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
              nRow = nRow + bDist[i][0];
              nCol = nCol + bDist[i][1];
            }
            
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              )
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
          break;
        case 4:
          
          
          for( let i = 0 ; i<8 ; i++)
          {
            let nRow = fRow;
          let nCol = fCol;
            while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && mat[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
              nRow = nRow + bDist[i][0];
              nCol = nCol + bDist[i][1];
            }
            
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              )
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
          break;
      case 3:
          for(let i = 0 ; i< 6; i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              && mat[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
              iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
              nRow = nRow + rDist[i][0];
              nCol = nCol + rDist[i][1];
              }
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
                && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
                )
                iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }
        break;
      case -3:
        for(let i = 0 ; i< 6; i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              && mat[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
              iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
              nRow = nRow + rDist[i][0];
              nCol = nCol + rDist[i][1];
              }
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
                && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
               )
                iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }
        break;
      case 2:

      for(let i = 0 ; i< 6; i++)
      {
        let nRow = fRow;
        let nCol = fCol;
        while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
          && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
          && mat[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
          iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          nRow = nRow + rDist[i][0];
          nCol = nCol + rDist[i][1];
          }
        if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
            && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
            )
            iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
      }

      for( let i = 0 ; i<8 ; i++)
          {
            let nRow = fRow;
          let nCol = fCol;
            while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && mat[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
              nRow = nRow + bDist[i][0];
              nCol = nCol + bDist[i][1];
            }
            
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              )
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
        break;
      case -2:
        for( let i = 0 ; i<8 ; i++)
        {
          let nRow = fRow;
        let nCol = fCol;
          while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
            && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
            && mat[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
            iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
            nRow = nRow + bDist[i][0];
            nCol = nCol + bDist[i][1];
          }
          
          if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
            && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
            )
            iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
        }
        for(let i = 0 ; i< 6; i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              && mat[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
              iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
              nRow = nRow + rDist[i][0];
              nCol = nCol + rDist[i][1];
              }
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
                && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
                )
                iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }

        break;
        case 1:
          for(let i = 0; i<6 ;i++)
        {
          let nRow = fRow;
            let nCol = fCol;
          if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
            && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
            
            ){
            iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }
        }
        for(let  i = 0  ;i<6  ;i++)
        {
          let nRow = fRow;
            let nCol = fCol;
          if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
            && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
            
           ){
            iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
        }
          break;
        case -1:
          for(let i = 0; i<6 ;i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              
              ){
              iisInCheck[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
            }
          }
          for(let  i = 0  ;i<6  ;i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              
             ){
              iisInCheck[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
            }
          }
          break;
        default:
          break;
        
  }}
  let isCheck = false;
  for(let i = 0 ; i<9 ; i++)
    for(let j = 0 ; j<9; j++)
    if(game.matrix[i][j] === who && iisInCheck[i][j] === 1) isCheck = true;
  return !isCheck

  }

  const makePosibleMove = (row,col,mode) =>{

    let piece = game.matrix[row][col];
   

    let enpasant = enpasObj        
    let fRow = row;
    let fCol = col;
    let posCpy = game.posibleMove;
    if(mode === 1)
    posCpy = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ]
    for(let i = 0 ; i<=8; i++)
      for(let j = 0 ; j <= 8 ; j++)
        posCpy[i][j] = 0;
    switch(piece){
      case -6:
          if(game.matrix[fRow+1][fCol-1] === 0 )
          {
            if(!verifCheck())
              posCpy[fRow+1][fCol-1] = 1;
            else if(verifPosibleMove(row,col,fRow+1,fCol-1,-1))
              posCpy[fRow+1][fCol-1] = 1;
          }
          if(game.matrix[fRow+1][fCol] === 0)
          {
            if(!verifCheck())
              posCpy[fRow+1][fCol] = 1;
            else if(verifPosibleMove(row,col,fRow+1,fCol,-1))
              posCpy[fRow+1][fCol] = 1;
          }
          if(fCol >= 2 && game.matrix[fRow+1][fCol-2] > 0)
          {
            if(!verifCheck())
              posCpy[fRow+1][fCol-2] = 1;
            else if(verifPosibleMove(row,col,fRow+1,fCol-2,-1))
              posCpy[fRow+1][fCol-2]  =1
            
          }
          if(fCol <= 7 && game.matrix[fRow+1][fCol+1] > 0)
          {
            if(!verifCheck())
            posCpy[fRow+1][fCol+1] = 1;
            else if(verifPosibleMove(row,col,fRow+1,fCol+1,-1))
            posCpy[fRow+1][fCol+1] = 1;
          }
          if(fRow === 2 &&  game.matrix[fRow+2][fCol-2] === 0 && game.matrix[fRow+1][fCol-1] === 0){
            if(!verifCheck())
            posCpy[fRow+2][fCol-2] = 1;
            else if(verifPosibleMove(row,col,fRow+2,fCol-2,-1))
            posCpy[fRow+2][fCol-2] = 1; 
          }  
          if(fRow === 2 && game.matrix[fRow+2][fCol] === 0 && game.matrix[fRow+1][fCol] === 0){
            if(!verifCheck())
            posCpy[fRow+2][fCol] = 1;
            else if(verifPosibleMove(row,col,fRow+2,fCol,-1))
            posCpy[fRow+2][fCol] = 1;
         }
         if(fCol < 8 && game.lastMove.piece === 6 && game.lastMove.to[0] === fRow && game.lastMove.to[1] === fCol+1 && game.lastMove.to[0]-game.lastMove.from[0] === -2)
         {
          if(!verifCheck())
            {posCpy[fRow+1][fCol] = 1;
              enpasant.canEnpas = true;
              enpasant.move = [fRow+1,fCol];
              enpasant.deleted = game.lastMove.to;
              }
            else if(verifPosibleMove(row,col,fRow+1,fCol,-1))
            {posCpy[fRow+1][fCol] = 1;
           
           enpasant.canEnpas = true;
           enpasant.move = [fRow+1,fCol];
           enpasant.deleted = game.lastMove.to;
           }
         }
         if(fCol > 0 && game.lastMove.piece === 6 && game.lastMove.to[0] === fRow && game.lastMove.to[1] === fCol-1 && game.lastMove.to[0]-game.lastMove.from[0] === -2)
         {
          if(!verifCheck()){
            posCpy[fRow+1][fCol-1] = 1;
            enpasant.canEnpas= true;
            enpasant.move = [fRow+1,fCol-1];
            enpasant.deleted = game.lastMove.to;}
            else if(verifPosibleMove(row,col,fRow+1,fCol-1,-1))
            {

           posCpy[fRow+1][fCol-1] = 1;
           enpasant.canEnpas= true;
           enpasant.move = [fRow+1,fCol-1];
           enpasant.deleted = game.lastMove.to;
           }
         }                  
         break; 
      
    
      case 6 :
        if(game.matrix[fRow-1][fCol+1] === 0 )
          {
            if(!verifCheck())
            posCpy[fRow-1][fCol+1] = 1;
            else if(verifPosibleMove(row,col,fRow-1,fCol+1,1))
            posCpy[fRow-1][fCol+1] = 1;
          }
          if(game.matrix[fRow-1][fCol] === 0)
          {
            if(!verifCheck())
            posCpy[fRow-1][fCol] = 1;
            else if(verifPosibleMove(row,col,fRow-1,fCol,1))
            posCpy[fRow-1][fCol] = 1;

          }
          if(fCol >= 2 && game.matrix[fRow-1][fCol-1] < 0)
          {
            if(!verifCheck())
            posCpy[fRow-1][fCol-1] = 1;
            else if(verifPosibleMove(row,col,fRow-1,fCol-1,1))
            posCpy[fRow-1][fCol-1] = 1;
          }
          if(fCol <= 7 && game.matrix[fRow-1][fCol+2] < 0)
          {
            if(!verifCheck())
            posCpy[fRow-1][fCol+2] = 1;
            else if(verifPosibleMove(row,col,fRow-1,fCol+2,1))
            posCpy[fRow-1][fCol+2] = 1;
          }
          if(fRow === 6 &&  game.matrix[fRow-2][fCol+2] === 0 && game.matrix[fRow-1][fCol+1] === 0){
            if(!verifCheck())
            posCpy[fRow-2][fCol+2] = 1;
            else if(verifPosibleMove(row,col,fRow-2,fCol+2,1))
            posCpy[fRow-2][fCol+2] = 1; 
          }  
          if(fRow === 6 && game.matrix[fRow-2][fCol] === 0 && game.matrix[fRow-1][fCol] === 0){
            if(!verifCheck())
            posCpy[fRow-2][fCol] = 1;
            else if(verifPosibleMove(row,col,fRow-2,fCol,1))
            posCpy[fRow-2][fCol] = 1; 
         }  
         if(fCol < 8 && game.lastMove.piece === -6 && game.lastMove.to[0] === fRow && game.lastMove.to[1] === fCol+1 && game.lastMove.to[0]-game.lastMove.from[0] === 2)
         {
          if(!verifCheck())
          {
            posCpy[fRow-1][fCol+1] = 1;
            enpasant.canEnpas = true;
            enpasant.move = [fRow-1,fCol+1];
            enpasant.deleted = game.lastMove.to;
            }
            else if(verifPosibleMove(row,col,fRow-1,fCol+1,1))
            {
           posCpy[fRow-1][fCol+1] = 1;
           enpasant.canEnpas = true;
           enpasant.move = [fRow-1,fCol+1];
           enpasant.deleted = game.lastMove.to;
           }
         }
         if(fCol > 0 && game.lastMove.piece === -6 && game.lastMove.to[0] === fRow && game.lastMove.to[1] === fCol-1 && game.lastMove.to[0]-game.lastMove.from[0] === 2)
         {
          if(!verifCheck())
             {posCpy[fRow-1][fCol] = 1;
              enpasant.canEnpas= true;
              enpasant.move = [fRow-1,fCol];
              enpasant.deleted = game.lastMove.to;
              }
            else if(verifPosibleMove(row,col,fRow-1,fCol,1))
           {posCpy[fRow-1][fCol] = 1;
           enpasant.canEnpas= true;
           enpasant.move = [fRow-1,fCol];
           enpasant.deleted = game.lastMove.to;
          }
         }  
        break;   
      
        case -5:
          if(fRow+2 <=8 && fCol+1 <=8 && game.matrix[fRow+2][fCol+1] >= 0)
          {
            if(!verifCheck())
            posCpy[fRow+2][fCol+1] = 1;
            else if(verifPosibleMove(row,col,fRow+2,fCol+1,-1))
            posCpy[fRow+2][fCol+1] = 1;
            
          }
          if(fRow+3 <=8 && fCol-1 >=0 && game.matrix[fRow+3][fCol-1] >= 0)
          {
            if(!verifCheck())
            posCpy[fRow+3][fCol-1] = 1;
            else if(verifPosibleMove(row,col,fRow+3,fCol-1,-1))
            posCpy[fRow+3][fCol-1] = 1;
          }
          if(fRow+2 <=8 && fCol-3 >=0 && game.matrix[fRow+2][fCol-3] >= 0)
          {
            if(!verifCheck())
            posCpy[fRow+2][fCol-3] = 1;
            else if(verifPosibleMove(row,col,fRow+2,fCol-3,-1))
            posCpy[fRow+2][fCol-3] = 1;
          }
          if(fRow+3 <=8 && fCol-2 >=0 && game.matrix[fRow+3][fCol-2] >= 0)
          {
            if(!verifCheck())
            posCpy[fRow+3][fCol-2] = 1;
            else if(verifPosibleMove(row,col,fRow+3,fCol-2,-1))
            posCpy[fRow+3][fCol-2] = 1;
          }
          if(fRow+1 <=8 && fCol+2<=8 && game.matrix[fRow+1][fCol+2] >= 0)
          {
            if(!verifCheck())
            posCpy[fRow+1][fCol+2] = 1;
            else if(verifPosibleMove(row,col,fRow+1,fCol+2,-1))
            posCpy[fRow+1][fCol+2] = 1;
          }
          if(fRow-1 >=0 && fCol+3<=8 && game.matrix[fRow-1][fCol+3] >= 0)
          {
            if(!verifCheck())
            posCpy[fRow-1][fCol+3] = 1;
            else if(verifPosibleMove(row,col,fRow-1,fCol+3,-1))
            posCpy[fRow-1][fCol+3] = 1;
          }
          if(fRow+1 <= 8 && fCol-3 >=0 && game.matrix[fRow+1][fCol-3] >=0)
          {
            if(!verifCheck())
            posCpy[fRow+1][fCol-3] = 1;
            else if(verifPosibleMove(row,col,fRow+1,fCol-3,-1))
            posCpy[fRow+1][fCol-3] = 1;
          }
          if(fRow-1 >=0 && fCol-2 >= 0 && game.matrix[fRow-1][fCol-2] >=0){
            if(!verifCheck())
            posCpy[fRow-1][fCol-2] = 1;
            else if(verifPosibleMove(row,col,fRow-1,fCol-2,-1))
            posCpy[fRow-1][fCol-2] = 1;
          }
          if(fRow-2 >= 0 && fCol-1 >= 0 && game.matrix[fRow-2][fCol-1] >= 0){
            if(!verifCheck())
            posCpy[fRow-2][fCol-1] = 1;
            else if(verifPosibleMove(row,col,fRow-2,fCol-1,-1))
            posCpy[fRow-2][fCol-1] = 1;
          }
          if(fRow-3 >= 0 && fCol+1 <= 8 && game.matrix[fRow-3][fCol+1] >= 0 ){
            if(!verifCheck())
            posCpy[fRow-3][fCol+1] = 1;
            else if(verifPosibleMove(row,col,fRow-3,fCol+1,-1))
            posCpy[fRow-3][fCol+1] = 1;
          }
          if(fRow-3>= 0 && fCol+2 <= 8 && game.matrix[fRow-3][fCol+2] >= 0){
            if(!verifCheck())
            posCpy[fRow-3][fCol+2] = 1;
            else if(verifPosibleMove(row,col,fRow-3,fCol+2,-1))
            posCpy[fRow-3][fCol+2] = 1;
          }
          if(fRow-2 >= 0 && fCol+3 <= 8 && game.matrix[fRow-2][fCol+3] >=0){
            if(!verifCheck())
            posCpy[fRow-2][fCol+3] = 1;
            else if(verifPosibleMove(row,col,fRow-2,fCol+3,-1))
            posCpy[fRow-2][fCol+3] = 1;
          }
          
          break;
        case 5:
          if(fRow+2 <=8 && fCol+1 <=8 && game.matrix[fRow+2][fCol+1] <= 0)
          {
            if(!verifCheck())
            posCpy[fRow+2][fCol+1] = 1;
            else if(verifPosibleMove(row,col,fRow+2,fCol+1,1))
            posCpy[fRow+2][fCol+1] = 1;
          }
          if(fRow+3 <=8 && fCol-1 >=0 && game.matrix[fRow+3][fCol-1] <= 0)
          {
            if(!verifCheck())
            posCpy[fRow+3][fCol-1] = 1;
            else if(verifPosibleMove(row,col,fRow+3,fCol-1,1))
            posCpy[fRow+3][fCol-1] = 1;
          }
          if(fRow+2 <=8 && fCol-3 >=0 && game.matrix[fRow+2][fCol-3] <= 0)
          {
            if(!verifCheck())
            posCpy[fRow+2][fCol-3] = 1;
            else if(verifPosibleMove(row,col,fRow+2,fCol-3,1))
            posCpy[fRow+2][fCol-3] = 1;
          }
          if(fRow+3 <=8 && fCol-2 >=0 && game.matrix[fRow+3][fCol-2] <= 0)
          {
            if(!verifCheck())
            posCpy[fRow+3][fCol-2] = 1;
            else if(verifPosibleMove(row,col,fRow+3,fCol-2,1))
            posCpy[fRow+3][fCol-2] = 1;
          }
          if(fRow+1 <=8 && fCol+2<=8 && game.matrix[fRow+1][fCol+2] <= 0)
          {
            if(!verifCheck())
            posCpy[fRow+1][fCol+2] = 1;
            else if(verifPosibleMove(row,col,fRow+3,fCol-2,1))
            posCpy[fRow+1][fCol+2] = 1;
          }
          if(fRow-1 >=0 && fCol+3<=8 && game.matrix[fRow-1][fCol+3] <= 0)
          {
            if(!verifCheck())
            posCpy[fRow-1][fCol+3] = 1;
            else if(verifPosibleMove(row,col,fRow-1,fCol+3,1))
            posCpy[fRow-1][fCol+3] = 1;
          }
          if(fRow+1 <= 8 && fCol-3 >=0 && game.matrix[fRow+1][fCol-3] <=0)
          {
            if(!verifCheck())
            posCpy[fRow+1][fCol-3] = 1;
            else if(verifPosibleMove(row,col,fRow+1,fCol-3,1))
            posCpy[fRow+1][fCol-3] = 1;
          }
          if(fRow-1 >=0 && fCol-2 >= 0 && game.matrix[fRow-1][fCol-2] <=0){
            if(!verifCheck())
            posCpy[fRow-1][fCol-2] = 1;
            else if(verifPosibleMove(row,col,fRow-1,fCol-2,1))
            posCpy[fRow-1][fCol-2] = 1;
          }
          if(fRow-2 >= 0 && fCol-1 >= 0 && game.matrix[fRow-2][fCol-1] <= 0){
            if(!verifCheck())
            posCpy[fRow-2][fCol-1] = 1;
            else if(verifPosibleMove(row,col,fRow-2,fCol-1,-1))
            posCpy[fRow-2][fCol-1] = 1;
          }
          if(fRow-3 >= 0 && fCol+1 <= 8 && game.matrix[fRow-3][fCol+1] <= 0 ){
            if(!verifCheck())
            posCpy[fRow-3][fCol+1] = 1;
            else if(verifPosibleMove(row,col,fRow-3,fCol+1,1))
            posCpy[fRow-3][fCol+1] = 1;
          }
          if(fRow-3>= 0 && fCol+2 <= 8 && game.matrix[fRow-3][fCol+2] <= 0){
            if(!verifCheck())
            posCpy[fRow-3][fCol+2] = 1;
            else if(verifPosibleMove(row,col,fRow-3,fCol+2,1))
            posCpy[fRow-3][fCol+2] = 1;
          }
          if(fRow-2 >= 0 && fCol+3 <= 8 && game.matrix[fRow-2][fCol+3] <=0){
            if(!verifCheck())
            posCpy[fRow-2][fCol+3] = 1;
            else if(verifPosibleMove(row,col,fRow-2,fCol+3,1))
            posCpy[fRow-2][fCol+3] = 1;
          }
          break;
        case -4:
          
          
          for( let i = 0 ; i<8 ; i++)
          {
            let nRow = fRow;
          let nCol = fCol;
            while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
              if(verifPosibleMove(row,col,nRow+bDist[i][0],nCol+bDist[i][1],-1))
              posCpy[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
              nRow = nRow + bDist[i][0];
              nCol = nCol + bDist[i][1];
            }
            
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] > 0
              && verifPosibleMove(row,col,nRow+bDist[i][0],nCol+bDist[i][1],-1))
              posCpy[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
          break;
        case 4:
          
          
          for( let i = 0 ; i<8 ; i++)
          {
            let nRow = fRow;
          let nCol = fCol;
            while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
              if(verifPosibleMove(row,col,nRow+bDist[i][0],nCol+bDist[i][1],1))
              posCpy[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
              nRow = nRow + bDist[i][0];
              nCol = nCol + bDist[i][1];
            }
            
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] < 0
              && verifPosibleMove(row,col,nRow+bDist[i][0],nCol+bDist[i][1],1))
              posCpy[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
          break;
      case 3:
          for(let i = 0 ; i< 6; i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
                if(verifPosibleMove(row,col,nRow+rDist[i][0],nCol+rDist[i][1],1))
                posCpy[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
              nRow = nRow + rDist[i][0];
              nCol = nCol + rDist[i][1];
              }
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
                && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
                && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] < 0
                && verifPosibleMove(row,col,nRow+rDist[i][0],nCol+rDist[i][1],1))
                posCpy[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }
        break;
      case -3:
        for(let i = 0 ; i< 6; i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
              if(verifPosibleMove(row,col,nRow+rDist[i][0], nCol+rDist[i][1],-1))
                posCpy[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
              nRow = nRow + rDist[i][0];
              nCol = nCol + rDist[i][1];
              }
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
                && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
                && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] > 0
                && verifPosibleMove(row,col,nRow+rDist[i][0],nCol+rDist[i][1],-1))
                posCpy[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }
        break;
      case 2:

      for(let i = 0 ; i< 6; i++)
      {
        let nRow = fRow;
        let nCol = fCol;
        while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
          && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
          && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
          if(verifPosibleMove(row,col,nRow+rDist[i][0],nCol+rDist[i][1],1))
            posCpy[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          nRow = nRow + rDist[i][0];
          nCol = nCol + rDist[i][1];
          }
        if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
            && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
            && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] < 0
            && verifPosibleMove(row,col,nRow+rDist[i][0],nCol+rDist[i][1],1))
            posCpy[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
      }

      for( let i = 0 ; i<8 ; i++)
          {
            let nRow = fRow;
          let nCol = fCol;
            while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
              if(verifPosibleMove(row,col,nRow+bDist[i][0],nCol+bDist[i][1],1))
              posCpy[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
              nRow = nRow + bDist[i][0];
              nCol = nCol + bDist[i][1];
            }
            
            if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
              && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
              && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] < 0
              && verifPosibleMove(row,col,nRow+bDist[i][0],nCol+bDist[i][1],1))
              posCpy[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
          }
        break;
      case -2:
        for( let i = 0 ; i<8 ; i++)
        {
          let nRow = fRow;
        let nCol = fCol;
          while(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
            && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
            && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] === 0){
            if(verifPosibleMove(row,col,nRow+bDist[i][0],nCol+bDist[i][1],-1))
            posCpy[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
            nRow = nRow + bDist[i][0];
            nCol = nCol + bDist[i][1];
          }
          
          if(nRow+bDist[i][0] >=0 && nRow+bDist[i][0] <= 8
            && nCol+bDist[i][1] >= 0 && nCol+bDist[i][1] <= 8
            && game.matrix[nRow+bDist[i][0]][nCol+bDist[i][1]] > 0
            && verifPosibleMove(row,col,nRow+bDist[i][0],nCol+bDist[i][1],-1))
            posCpy[nRow+bDist[i][0]][nCol+bDist[i][1]] = 1;
        }
        for(let i = 0 ; i< 6; i++)
          {
            let nRow = fRow;
            let nCol = fCol;
            while(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
              && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
              && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] === 0){
              if(verifPosibleMove(row,col,nRow+rDist[i][0],nCol+rDist[i][1],-1))
                posCpy[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
              nRow = nRow + rDist[i][0];
              nCol = nCol + rDist[i][1];
              }
            if(nRow+rDist[i][0] >=0 && nRow+rDist[i][0] <= 8
                && nCol+rDist[i][1] >= 0 && nCol+rDist[i][1] <= 8
                && game.matrix[nRow+rDist[i][0]][nCol+rDist[i][1]] > 0
                && verifPosibleMove(row,col,nRow+rDist[i][0],nCol+rDist[i][1],-1))
                posCpy[nRow+rDist[i][0]][nCol+rDist[i][1]] = 1;
          }

        break;
      case 1:
        for(let i = 0; i<6 ;i++)
        {
          if(fRow+rDist[i][0] >=0 && fRow+rDist[i][0] <= 8
            && fCol+rDist[i][1] >= 0 && fCol+rDist[i][1] <= 8
            && game.matrix[fRow+rDist[i][0]][fCol+rDist[i][1]] <= 0
            && game.isInCheck[fRow+rDist[i][0]][fCol+rDist[i][1]] === 0
            && verifPosibleMove(row,col,fRow+rDist[i][0],fCol+rDist[i][1],1)){
            posCpy[fRow+rDist[i][0]][fCol+rDist[i][1]] = 1;
          }
        }
        for(let  i = 0  ;i<6  ;i++)
        {
          if(fRow+bDist[i][0] >=0 && fRow+bDist[i][0] <= 8
            && fCol+bDist[i][1] >= 0 && fCol+bDist[i][1] <= 8
            && game.matrix[fRow+bDist[i][0]][fCol+bDist[i][1]] <= 0
            && game.isInCheck[fRow+bDist[i][0]][fCol+bDist[i][1]] === 0
            && verifPosibleMove(row,col,fRow+bDist[i][0],fCol+bDist[i][1],1)){
            posCpy[fRow+bDist[i][0]][fCol+bDist[i][1]] = 1;
          }
        }
        break;
      case -1:
        for(let i = 0; i<6 ;i++)
        {
          if(fRow+rDist[i][0] >=0 && fRow+rDist[i][0] <= 8
            && fCol+rDist[i][1] >= 0 && fCol+rDist[i][1] <= 8
            && game.matrix[fRow+rDist[i][0]][fCol+rDist[i][1]] >= 0
            && game.isInCheck[fRow+rDist[i][0]][fCol+rDist[i][1]] === 0
            && verifPosibleMove(row,col,fRow+rDist[i][0],fCol+rDist[i][1],-1)){
            posCpy[fRow+rDist[i][0]][fCol+rDist[i][1]] = 1;
          }
        }
        for(let  i = 0  ;i<6  ;i++)
        {
          if(fRow+bDist[i][0] >=0 && fRow+bDist[i][0] <= 8
            && fCol+bDist[i][1] >= 0 && fCol+bDist[i][1] <= 8
            && game.matrix[fRow+bDist[i][0]][fCol+bDist[i][1]] >= 0
            && game.isInCheck[fRow+bDist[i][0]][fCol+bDist[i][1]] === 0
            && verifPosibleMove(row,col,fRow+bDist[i][0],fCol+bDist[i][1],-1)){
            posCpy[fRow+bDist[i][0]][fCol+bDist[i][1]] = 1;
          }
        }
        break;
      default:
        break;
    }
   if(mode === 1)
   {
    let output = 0;
      for(let i = 0 ; i<9; i++)
        for(let j = 0 ; j<9; j++){
          if(posCpy[i][j] === 1)output = output + 1
      }
      console.log(output)
      return output
   }
    let haveMoves = false;
    for(let i = 0 ; i <9 ; i++)
      for(let j = 0; j<9 ; j++)
      {
        if(game.posibleMove[i][j] === 1)haveMoves = true;
      }
    if(haveMoves === false)return;

    setGame({...game,enpas:enpasant, isFirstSel:true, firstSel:[row,col], posibleMove:posCpy});
    console.log('Selected ' + row + ' ' + col);
      
      
      
  }
  const verifMate = (who) =>{
    console.log('I m running')
    let total = 0
    let mat = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];

    for(let i = 0 ; i<9 ; i++)
      for(let j = 0; j<9; j++)
        mat[i][j] = game.matrix[i][j]
    console.log(mat)
    for(let i = 0 ; i<9; i++)
      for(let j = 0 ; j<9; j++)
      {

        if(mat[i][j] * who > 0){
          console.log(total + ' ' + i +' ' + j + ' ' + console.log(makePosibleMove(i,j,1)))
            total=total + makePosibleMove(i,j,1)
        }
      }
      console.log(total + ' posible moves')
      if(total === 0) return true
      return false
  }
  const gameLogic = (row,col) => {
      console.log(game);

      if(winner !== 0)
      {
        return;
      }

      if(game.isInCheck)
      {
          if(verifMate(game.whosTurn?1:-1))
          {
            setWinner(game.whosTurn?1:-1)
            return;
          }


      }

      if(game.isFirstSel === false)
      {
        if(game.matrix[row][col] === 0)return;
        if(game.whosTurn === true && game.matrix[row][col] < 0) return;
        if(game.whosTurn === false && game.matrix[row][col] > 0) return;
          

        
       
        makePosibleMove(row,col)
      }
      if(game.isFirstSel === true)
      {
        if(game.whosTurn && game.matrix[row][col] >=1)
        {
          setGame({...game, posibleMove:emptyMat})
          makePosibleMove(row,col);
          return;
        }
        if(game.whosTurn === false && game.matrix[row][col] <= -1)
        {
          setGame({...game, posibleMove:emptyMat})
          makePosibleMove(row,col);
          return;
        }

        let matCpy= game.matrix;

        let fPiece = game.matrix[game.firstSel[0]][game.firstSel[1]];
        
        if(game.posibleMove[row][col] === 0)return;
        

        matCpy[game.firstSel[0]][game.firstSel[1]] = 0;
        matCpy[row][col] = fPiece;
        
        if(game.enpas.canEnpas && row === game.enpas.move[0] && col === game.enpas.move[1])
        {
          matCpy[game.enpas.deleted[0]][game.enpas.deleted[1]] = 0;
        }

        if(fPiece === 6 && row === 0)
        matCpy[row][col] = 2;
        if(fPiece === -6 && row === 8)
        matCpy[row][col] = -2

        if(game.whosTurn) makeIsInCheck(1);
        if(!game.whosTurn) makeIsInCheck(-1);

        setGame({...game,started:true, enpas:enpasObj,posibleMove:emptyMat, matrix:matCpy,whosTurn:!game.whosTurn, isFirstSel:false, lastMove:{piece:fPiece,from:game.firstSel,to:[row,col]}})
      }
    

  };

  const resetGame = () =>{
    setSeconds1(600)
    setSeconds2(600)
    setGame({
      matrix:[
        [-3,-5,-4,-2,-4,-1,-4,-5,-3],
        [0,0,0,0,0,0,0,0,0],
        [-6,-6,-6,-6,-6,-6,-6,-6,-6],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [6,6,6,6,6,6,6,6,6],
        [0,0,0,0,0,0,0,0,0],
        [3,5,4,2,4,1,4,5,3],
      ],
      posibleMove:[
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
      ],
      isInCheck:[
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
      ],
      check: false,
      firstSel:[-1,-1],
      isFirstSel: false,
      secondSel:[-1,-1],
      isSecondSel: false,
      whosTurn: true,
      started: false,
      lastMove:{
        piece: -1,
        from: [-1,-1],
        to: [-1,-1],
      },
      enpas:{
        canEnpas: false,
        move:[-1,-1],
        deleted:[-1,-1]
      }
     })
  }
  var timer
  useEffect(()=>{
    timer = setInterval(()=>{
      if(game.started === false) return;
      if(game.whosTurn === true)
      setSeconds1(seconds1-1);
      else if(game.whosTurn === false)
      setSeconds2(seconds2-1);
      
    },1000)
    return () => clearInterval(timer)
  })

  useEffect(()=>{
    if(seconds1 === 0)
    {setGame({...game, started:false}); setWinner(1)}
  },[seconds1])

  useEffect(()=>{
    if(seconds2 === 0)
    {setGame({...game, started:false}); setWinner(-1)}
  },[seconds2])


  const secToMin = (sec) => {
      let min = Math.floor(sec / 60)
      sec = sec % 60
      if(sec < 10) return (min + ':0' + sec)
      return (min+':'+sec)
  } 

  return (
    <main
      className={`bg-sky-300  absolute overflow-hidden h-screen w-screen  ${inter.className}`}
    >
      
      <div className=' relative left-[5vw] sm:left-[calc(65vw-300px)] top-[calc(50vh-300px)] md:scale-150 md:left-[calc(75vw-300px)] md:top-[calc(50vh-300px)]'>
      <h1 className='relative top-[-45px] border-white border-2 rounded-lg bg-slate-700 flex flex-wrap w-[100px] text-white justify-center'>{secToMin(seconds2)}</h1>
      {
        matrix.map( (row,key)=>{
            return(
              <div key={key} className={styling[key]}>
                {
                  row.map((col,index)=>{
                    return(
                      <div key={index} onClick={()=>{gameLogic(key,index)}} className={(key%3 === 0) ? hex1Style[(key*9+index)%3] : ((key%3 === 1)? hex2Style[(key*9+index)%3] : hex3Style[(key*9+index)%3])}>
                       <img className='z-20 absolute left-0 top-0' height={30} width={30} alt='re'
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
                     {...game.matrix[key][index] === 0 && gol}
                     />
                     {game.posibleMove[key][index] === 1 && <div className='z-30 opacity-80 rounded-full bg-orange-200 h-[50%] w-[50%] relative left-[25%] top-[25%]'></div>}
                      {(game.matrix[key][index] === (game.whosTurn? 1: -1) && game.isInCheck[key][index] === 1)&& <div className='rounded-full bg-blue-800 h-[80%] w-[80%] left-[10%] top-[10%] relative '></div>}
                      </div>         
                    )
                      })
                }
              </div>
            )
        })
      }
      <h1 className='relative top-[250px] rounded-lg border-2 border-white bg-slate-700 flex flex-wrap w-[100px] text-white justify-center'>{secToMin(seconds1)}</h1>
      <h1 className='text-black text-3xl relative flex top-[260px] z-0 '>{game.whosTurn?'White to move':'Black to move'}!</h1>
    <h1 className='text-black text-3xl relative flex top-[260px] z-0 '>{verifCheck()?`${game.whosTurn?'WHITE':'BLACK'} is in CHECK`:'No one in Check'}!</h1>
     {winner !== 0 ? <h1 className='text-2xl top-[260px] relative'>{winner === 1? 'White ': 'Black ' } won</h1> : <h1 className='text-2xl top-[260px] relative'>The game is in progress</h1>}
      <button className='text-xl top-[270px] relative bg-white rounded-lg py-2 px-5 hover:bg-slate-200 transition-all duration-200' onClick={resetGame}>{winner ===0 ?'Reset Game':'New Game'}</button>
      </div>
      </main>
  )
}
