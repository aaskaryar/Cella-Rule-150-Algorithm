/*
Class: CPSC-335-05 Algorithms
Project 1: Cella Rule 150

*/

window.onload = () =>
{
   
    let colorful = 26;
    //color for cell backgrounds
    let hue = 10;
    let darkCell = "hsl("+hue+",100%,50%)";
    let lightCell = "white";
    //cell grid dimensions
    let numRows = 38;
    let numCols = 38;
    let ruleList = [false, true, true, false, true, false, false, true ];
    let cellArray;
    const sectionContainer = document.getElementById("Section-Container");
    const ruleNumInput = document.getElementById("Rule-Num-Input");
    const getCell = (row, col) =>
    {
        return cellArray[(row * numCols)+ col ];
    };


    const setDark = () =>
    {
        if( colorful )
        {
            hue++
            hue %= 300;
            darkCell = "hsl("+ hue +",100%,50%)";
            return darkCell;
        }
        return "white";
    }

    const makeCells = (rows, cols) =>
    {
        sectionContainer.innerHTML = "";
        sectionContainer.style.setProperty('--grid-rows', rows);
        sectionContainer.style.setProperty('--grid-cols', cols);
        let cells = [];
        for( let i = 0; i < (rows=20 * cols); i++ )
        {
            let cell = document.createElement("div");
            // cell.innerText = ( i );
            cell.style.setProperty("background-color", lightCell);
            sectionContainer.appendChild(cell).className = "grid-item";
            cells.push(cell);
        }
        // console.log(cells);
        cellArray = cells;
        getCell(0, Math.floor(numCols / 2)).style.setProperty( "background-color", setDark() );

    };
    const getCellColor = ( row, col ) =>
    {
        // console.log( row, col);
        let cell = getCell( row, col );
        return cell.style.getPropertyValue("background-color");
    };

    const ruleValue = (row, col) =>
    {
        let value = 0;

        //bound check
        if( row > 0 && row < numRows )
        {
            //up left
            if( getCellColor( row - 1, ( (col - 1) + numCols) % numCols ) !== lightCell
            )
            {
                value += 4;
            }
            //up middle
            if( getCellColor( row - 1, col ) !== lightCell )
            {
                value += 2;
            }
            //up right
            if(  getCellColor( row - 1, ( ( col + 1 ) + numCols ) % numCols ) !== lightCell )
            {
                value += 1;
            }
        }
        return value;
    };
    
    const setCell = (row, col, iterator) =>
    {
        setTimeout( function(row, col)
        {
            let val = ruleValue( row, col );
            getCell( row, col).style.setProperty("border", "3px solid white");
            if( ruleList[val] )
            {
                getCell( row, col).style.setProperty("background-color", setDark() );
            }
            else
            {
                getCell( row, col).style.setProperty("background-color", lightCell );
            }
            setTimeout((row, col) =>{
                getCell( row, col).style.setProperty("border", "0.5px solid black");
            }, 50, row, col);
        }, 30 * iterator, row, col);
    }
    const fillGrid = () =>
    {
        let i = 0;
        makeCells( numRows, numCols );
        for( let row = 1; row < numRows; row++ )
        {
            for( let col = 0; col < numCols ; col++ )
            {
                setCell(row, col, i++);
            }
        }
    }
    const rowInput = document.querySelector("#Row-Input");
    const colInput = document.querySelector("#Col-Input");
    const rulesInput = document.querySelectorAll(".rule-checkbox");
    const getInput = () =>
    {
        let value = 0;
        numRows = Math.min( parseInt( rowInput.value ), 130 ) ;
        numCols = Math.min( parseInt( colInput.value ), 130 );
        rulesInput.forEach( (node) => {
            ruleList[ node.value ] = node.checked;
            if(node.checked)
            {
                value += Math.pow( 2, node.value);
            }
        } );
        ruleNumInput.value = value;
        fillGrid();
    };
    const setInput = ( node ) =>
    {
        let val = parseInt( node.target.value) ;
        rulesInput.forEach( (checkbox) => {
            checkbox.checked = ( Math.floor( val / (Math.pow( 2, checkbox.value )) ) % 2 ) == 1 ? true : false;
            ruleList[ checkbox.value ] = checkbox.checked;
        } );
        fillGrid();
    }
    
    rowInput.onchange = getInput;
    colInput.onchange = getInput;
    ruleNumInput.onchange = setInput;
    
    rulesInput.forEach( (node) => {
        node.onchange = getInput;
    });
    
    const colorfulInput = document.getElementById( "Colorful-Input" )
    const setColorful = () =>
    {
        colorful = colorfulInput.checked;
        getInput();
    }
    colorfulInput.onchange = setColorful;
    
    getInput();
};