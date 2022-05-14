import React, { useState, useEffect, useRef } from "react";

export default function GameComponent({data}) {

    const applyResetCondition = (placeValue, tempColors, tempDisable) => {
        var first = selectedButtons[0], second = selectedButtons[1];
        tempDisable[first] = false
        tempDisable[second] = false
        disableClickedButton(tempDisable, placeValue)

        tempColors[first] = 'white'
        tempColors[second] = 'white'
        tempColors[placeValue] = 'blue'
        setColors(tempColors)
        
        setSelectedButtons([placeValue])
        
    }

    const isUserCorrect = (placeValue, prev) => {
        setSelectedButtons([prev,placeValue])
        var result = false;
        Object.keys(data).forEach(key => {
            if(key === prev && data[prev] === placeValue) {
                result = true;
            } else if(key === placeValue && data[placeValue] === prev) {
                result = true
            }
        })
        return result
    } 

    const makeChangesForWrongAnswer = (tempColors, tempDisable, prev, placeValue) => {
        tempColors[placeValue] = "red"
        tempColors[prev] = "red"
        setColors(tempColors)
        tempDisable[placeValue] = true
        tempDisable[prev] = true
        setDisability(disability)
    }

    const makeChangesForCorrectAnswer = (prev, placeValue) => {
        var newArray = places.filter(place => {
            return place !== prev && place !== placeValue
        })
        setPlaces(newArray)
        setSelectedButtons([])
    }

    const makeChangeForFirstChoice = (placeValue,tempColors,tempDisable) => {
        setSelectedButtons([placeValue])
        tempColors[placeValue] = "blue"
        setColors(tempColors)
        disableClickedButton(tempDisable, placeValue)
    }

    const disableClickedButton = (tempDisable, placeValue) => {
        tempDisable[placeValue] = true
        setDisability(tempDisable)
    }

    const performShuffling = (placeData) => {
        var len = placeData.length
        for(var i=0;i<len;i++) {
            var randomIdx = Math.floor((Math.random() * len));
            var temp  = placeData[randomIdx]
            placeData[randomIdx] = placeData[i]
            placeData[i] = temp
        }
        return placeData
    }

    const convertDataFromMapToArray = () => {
        var placeData = []
        Object.keys(data).forEach(key => {
            placeData.push(key);
            placeData.push(data[key]);
        })
        return placeData
    }

    const handleClick = (event) => {
        var tempColors = colors
        var tempDisable = disability
        let placeValue = (event.target.innerText)

        //already 2 selected
        if(selectedButtons.length == 2) {
            applyResetCondition(placeValue, tempColors, tempDisable)
        }

        //first selection
        else if(selectedButtons.length === 0) {
        
            makeChangeForFirstChoice(placeValue, tempColors, tempDisable)
        
        } else {

            var prev = selectedButtons[0]
            var result = isUserCorrect(placeValue, prev)
            
            //Wrong Answer
            if(!result) {
                makeChangesForWrongAnswer(tempColors, tempDisable, prev, placeValue)   
            } else {
                //Right Answer
                makeChangesForCorrectAnswer(prev, placeValue)
            }
        }
    }

    const getColorMap = () => {
        const colorMap = {}
        for (var place in places) {
            colorMap[place] = "white"
        }
        return colorMap
    }

    const getDisabledMap = () => {
        const disabledMap = {}
        for (var place in places) {
            disabledMap[place] = false
        }
        return disabledMap
    }

     //Hooks
     const [places,setPlaces] = useState(performShuffling(convertDataFromMapToArray()))
     const [colors,setColors] = useState(getColorMap())
     const [disability,setDisability] = useState(getDisabledMap())
     const [selectedButtons,setSelectedButtons] = useState([])
     
    useEffect(() => {
        //console.log("Loaded")
    },[])

    return (
        <div>
            <div style={{fontSize:'1.3rem',textDecoration: 'underline'}}>Country-Capital Game</div>
            {   
                places.length > 0 && 
                places.map(place => (
                  <div key = {place} style={{margin:'5px'}}>
                    <button 
                        disabled = {disability[place]}
                        onClick={handleClick}
                        style = {{background: colors[place]}}>{place}</button>
                </div>
                ))
            }

            {
                places.length == 0
                 &&
                 <div style={{color: 'red'}}>Congratulations</div>
            }
        </div>
        
    )
}