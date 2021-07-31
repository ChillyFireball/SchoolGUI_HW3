/*
    File: script.js
    GUIAssignment:  Creating an Interactive Dynamic Table
    Haley Santomas, UMass Lowell Computer Science, haley_santomas@student.uml.edu
    Date: 7/22/2021
    Summary: This file contains scripts to collect input parameters from the form upon clicking the submit button, then
    utilizes that input to construct a table. It also generates an error message for invalid inputs.
*/

/***** BASE FUNCTION *****/
function submitForm()
{
    // Get inputs.
    var rowMin = document.getElementById("rowMin");
    var rowMax = document.getElementById("rowMax");
    var colMin = document.getElementById("colMin");
    var colMax = document.getElementById("colMax");
    //alert(colMin + ' ' + colMax + ' ' + rowMin + ' ' + rowMax);

    // Handle input errors.
    let fatalError = checkInputError();

    // Display table.
    if(!fatalError)
    {
        displayTable();
    }
}

/***** ERROR HANDLING *****/
function checkInputError()
{
    let inputMin = -50;
    let inputMax = 50;
    let maxInputDifferential = 100;

    // Input is missing.
    if(isNaN(rowMin.valueAsNumber) || isNaN(rowMax.valueAsNumber) || isNaN(colMin.valueAsNumber) || isNaN(colMax.valueAsNumber) )
    {
        displayErrorMessage("One or more inputs are not a valid number.");
        return true;
    }
    // Input is too small.
    else if(rowMin.value < inputMin || rowMax.value < inputMin || colMin.value < inputMin || colMax.value < inputMin)
    {
        displayErrorMessage("One or more inputs is too small. (Input should be no smaller than " + inputMin + ".)");
        return true;
    }
    // Input is too large.
    else if(rowMin.value > inputMax || rowMax.value > inputMax || colMin.value > inputMax || colMax.value > inputMax)
    {
        displayErrorMessage("One or more inputs is too large. (Input should be no bigger than " + inputMax + ".)");
        return true;
    }
    // Max input is smaller than min input.
    else if(rowMax.value - rowMin.value < 0 || colMax.value - colMin.value < 0)
    {
        displayErrorMessage("A max input is smaller than a min input.")
    }
    // Input differential is too large.
    else if(rowMax.value - rowMin.value > maxInputDifferential || colMax.value - colMin.value > maxInputDifferential) // Shouldn't ever be negative since we already checked for that just above.
    {
        displayErrorMessage("Input differential is too large. (There should be no more than " + maxInputDifferential + " between a minimum and maximum value.)");
        return true;
    }
    // If no error, hide error message and return false.
    else{
        hideErrorMessage();
        return false;
    }
}
function displayErrorMessage(errorString)
{
    let errorMessage = document.getElementById("errorMessageText");

    // Set error string.
    errorMessage.innerHTML = errorString;

    // Show error message.
    showErrorMessage();
}
function showErrorMessage()
{
    let errorItems = document.getElementsByClassName("errorMessage");

    for(let i = 0; i < errorItems.length; i++)
    {
        errorItems[i].style.display = "block";
    }
}
function hideErrorMessage()
{
    let errorItems = document.getElementsByClassName("errorMessage");

    for(let i = 0; i < errorItems.length; i++)
    {
        errorItems[i].style.display = "none";
    }
}

/***** TABLE DISPLAY *****/
function displayTable()
{
    // Create and calculate table value arrays.
    var rowHead = new Array();
    for(let i = rowMin.valueAsNumber; i <= rowMax.valueAsNumber; i++)
    {
        rowHead.push(i);
    }

    var columnHead = new Array();
    for(let i = colMin.valueAsNumber; i <= colMax.valueAsNumber; i++)
    {
        columnHead.push(i);
    }

    var multiplicationTable = new Array();
    for(let i = 0; i < columnHead.length; i++) // For every row...
    {
        // Create an empty array for the row.
        multiplicationTable.push(new Array());

        // Fill out this row's array.
        for(let j = 0; j < rowHead.length; j++) // For every column...
        {
            // Push the product of rowHead[j] * columnHead[i]
            multiplicationTable[i].push(rowHead[j] * columnHead[i]);
        }
    }

    // Print to table.
    printTable(rowHead, columnHead, multiplicationTable);
}
function printTable(rowHead, columnHead, multiplicationTable)
{
    // Get table.
    var resultTable = document.getElementById("tableResult");

    // Delete previous table, if it exists.
    deletePreviousTable(resultTable);

    // Start with the first row, since it's unique.
    let firstRow = resultTable.insertRow(0);
    //let emptyCell = firstRow.insertCell(0);
    let emptyCell = document.createElement("th");
    emptyCell.classList.add("thTOP");
    emptyCell.style.color = "black";
    emptyCell.style.fontWeight = "bold";
    emptyCell.innerHTML = " ";
    firstRow.appendChild(emptyCell);
    
    for(let i = 0; i < rowHead.length; i++)
    {
        // Create new cell at i+1 with rowHead i.
        //let cell = firstRow.insertCell(i + 1);
        let cell = document.createElement("th");
        cell.classList.add("thTOP");
        if(i == 0 || i % 2 == 0)
            cell.classList.add("thGray");
        cell.style.fontWeight = "bold";
        cell.innerHTML = rowHead[i];
        firstRow.appendChild(cell);
    }

    // Now do the rest of the rows. For every column...
    for(let i = 0; i < columnHead.length; i++)
    {
        // Insert a new row at i+1.
        let row = resultTable.insertRow(i + 1);

        // Start by filling in the first cell with the current columnHead value.
        //let firstCell = row.insertCell(0);
        let firstCell = document.createElement("th");
        firstCell.classList.add("thSIDE");
        firstCell.style.fontWeight = "bold";
        firstCell.innerHTML = columnHead[i];
        row.appendChild(firstCell);

        // Now fill in the rest of the cells.
        for(let j = 1; j <= multiplicationTable[i].length; j++)
        {
            let cell = row.insertCell(j);
            cell.style.backgroundColor = "white";
            cell.style.color = "black";
            cell.innerHTML = multiplicationTable[i][j - 1];
        }
    }
}
function deletePreviousTable(resultTable)
{
    // Delete all contents.
    resultTable.innerHTML = "";
}