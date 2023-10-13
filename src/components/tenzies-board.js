import {useState, useEffect} from "react"
import Element from "./tenzies-elem"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function TenziesBoard(){

    const [elements, setElements] = useState([]);
    const [firstItemClick, updateFirstItemClick] = useState(null);
    const [freezeElements, setFreezeElements] = useState([]);

    let [click, clickUpdate] = useState(0);
    let [end, isEnd] = useState(false);


    useEffect(() => {
        if(elements.length > 0){
            getRandData();
        }else{
            let randData = [];
        
            for (let i = 0; i < 10; i++) {
                randData.push({
                    id: nanoid(),
                    val: Math.floor(Math.random() * 10)
                });
            }

            setElements(randData);
        }

        if(freezeElements.length === 10){
            endGame();
        }
    }, [click])



    function getRandData() {

        let randData = [...elements];
    
        for (let i = 0; i < 10; i++) {
            if (freezeElements.some(elem => elem === randData[i].id)) {
                continue;
            } else {
                randData[i] = {
                    id: nanoid(),
                    val: Math.floor(Math.random() * 10)
                };

            }
        }
    
        setElements(randData);
    }


    
    function clickItem(valOfClicked, index){

        clickUpdate(click += 1);

        if(!firstItemClick){
            updateFirstItemClick(valOfClicked);
            setFreezeElements(freezeElements => [...freezeElements, index]);
        }

        if(firstItemClick === valOfClicked){
            setFreezeElements(freezeElements => [...freezeElements, index]);
        }

    }


    let setOfElements = elements.map((data) => {
        return(
            freezeElements.some((element) => element === data.id)
            ? 
                <Element 
                    key={data.id} 
                    id={data.id} 
                    number={data.val} 
                    func={clickItem} 
                    freezeStyles={{ background: '#f49d33', color: 'white', cursor: 'not-allowed'}}
                />
            :
                <Element 
                    key={data.id} 
                    id={data.id} 
                    number={data.val} 
                    func={clickItem} 
                />
        )
    })

    function endGame(){
        isEnd(!end);
    }

    function resetGame(){
        updateFirstItemClick(null);
        setFreezeElements([]);
        clickUpdate(0);
        isEnd(false);
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    return(
        <>
            <div className="tenzies--board">
                <div className="top--text">
                    <h1 className="header">Tenzies</h1>
                    
                    {!end ? (
                        <p className="description">
                            Roll until all dices are the same. Click each die to freeze it at it's current value between rolls.
                        </p>
                    ):(
                        <>
                            <p className="description">
                                You won! 🎉
                                Amount of steps: {click}
                            </p>

                            <button className="reset--button" onClick={resetGame}>
                                Start again!
                            </button>

                            <Confetti
                            width={width}
                            height={height}
                            />
                        </>
                    )}

                </div>
                <div className="board">
                    <ul className="tenzies--elem">
                        {setOfElements}
                    </ul>
                </div>
            </div>
        </>
    )
}