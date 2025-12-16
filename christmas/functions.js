/**
 * @param {"th"|"td"} cellType
 * @param {string} cellContent
 * @param {HTMLTableRowElement} parentRow
 * 
 * @returns {HTMLTableCellElement}
 */
function createCell(cellContent, parentRow, cellType)
{
    const cell = document.createElement(cellType);
    cell.innerText = cellContent;
    parentRow.appendChild(cell);
    return cell;
}

/**
 * @param {TbodyItem[]} list
 * 
 * @returns {void}
 */
function renderTbody(list)
{
    tbody.innerHTML = "";
    for(const item of list)
    {
        const tr = document.createElement("tr");
        tbody.appendChild(tr);
 
        const td = createCell(item.what, tr, "td");
        createCell(item.who1, tr, "td");
        createCell(item.shift1, tr, "td");
 
        if(item.who2 && item.shift2)
        {
            td.rowSpan = "2";
            const tr2 = document.createElement("tr");
            tbody.appendChild(tr2);
 
            createCell(item.who2, tr2, "td");
            createCell(item.shift2, tr2, "td");
        }
    }
}

/**
 * @param {FormField[]} fields
 * 
 * @returns {HTMLFormElement}
 */
function createForm(fields)
{
    const form = document.createElement("form");
    for(const field of fields)
    {
        createField(field, form);
    }
 
    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Hozzáadás";
    form.appendChild(button);
 
    return form;
}

/**

 * @param {FormField} field
 * @param {HTMLFormElement} form
 * 
 * @returns {void}
 */
function createField(field, form)
{
    const div = document.createElement("div");
    form.appendChild(div);
 
    if(field.type === "checkbox")
    {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = field.id;
        input.name = field.name;
        div.appendChild(input);
 
        const label = document.createElement("label");
        label.innerText = field.label;
        label.htmlFor = field.id;
        div.appendChild(label);
    }
    else
    {
        const label = document.createElement("label");
        label.innerText = field.label;
        label.htmlFor = field.id;
        div.appendChild(label);
        div.appendChild(document.createElement("br"));
 
        if(field.type === "select")
        {
            const select = document.createElement("select");
            select.id = field.id;
            div.appendChild(select);
 
            const defaultOption = document.createElement("option");
            defaultOption.innerText = "Válassz műszakot!";
            defaultOption.value = "";
            select.appendChild(defaultOption);
 
            for(const option of field.optionList)
            {
                const option2 = document.createElement("option");
                option2.value = option.value;
                option2.innerText = option.label;
                select.appendChild(option2);
            }
        }
        else
        {
            const input = document.createElement("input");
            input.id = field.id;
            input.name = field.name;
            div.appendChild(input);
        }
    }
 
    const span = document.createElement("span");
    span.classList.add("error");
    div.appendChild(span);
}

/**
 * @param {HTMLInputElement|HTMLSelectElement} input
 * 
 * @returns {boolean}
 */
function validate(input)
{
    let valid = true;
    if(input.value === "")
    {
        input.parentElement.querySelector(".error").innerText = "Kötelező elem!";
        valid = false;
    }
    return valid;
}

/**
 * @param {HTMLFormElement} form
 * 
 * @returns {void}
 */
function clearErrors(form)
{
    const errors = form.querySelectorAll(".error");
    for(const error of errors)
    {
        error.innerText = "";
    }
}