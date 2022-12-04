//CREATE FORM FROM JSON
Uluru.prototype.jsonformBuilder = function (jsonObject){
    // console.log(jsonObject);
    let has1button = false;
    let content = '<form id="'+jsonObject.id+'">';
    for (const [key,value] of Object.entries(jsonObject.content)) {
        let inputContent = "";
        let checkBoxContent = "";

        let checkedCheckbox = "";

        let type = value.type ? "type= " + value.type : "";
        let valueOfInput = value.value ? "value=" + value.value : "";
        let classOfInput = value.class ? "class=" + value.class : "";
        let forOfLabel = value.id ? "for=" + value.id : "";
        let label = value.label ? value.label : "";
        let placeholder = value.placeholder ? "placeholder= \"" + value.placeholder +"\"": "";
        if(value.type === "checkbox"){
            checkedCheckbox = value.value !== "0" ? "checked" : "";
        }

        let itemContent = "";
        if(key === "buttons"){
            itemContent = "<div class='buttons'>"
            for (const [keyBt,valueButton] of Object.entries(value)) {
                let btName = keyBt ? "name= " + keyBt : "";
                let btType = valueButton.type ? "type= " + valueButton.type : "";
                let btClass = valueButton.class ? "class= " + valueButton.class : "";
                let btOnClick = valueButton.btClick ? "onClick= " + valueButton.btClick : "";
                itemContent += '<button "' + btName + '"  ' + btType + ' ' + btClass + ' ' + btOnClick + '>';
                itemContent += valueButton.text +' </button>'
            }
            content += itemContent + " </div>";
        }else {
            if(label){
                itemContent += '<label '+forOfLabel+'>'+label+'</label>';
            }
            inputContent = '<' + value.inputType + ' name="' + key + '"  ' + type + ' ' + valueOfInput + ' ' + classOfInput + ' '+placeholder+' '+checkedCheckbox+'>';
            if(value.type === "checkbox"){
                inputContent = this.addParentDivToContent(inputContent, "class='item'");
                let tmp = this.addParentDivToContent(value.text, "class='item'");
                checkBoxContent += inputContent;
                checkBoxContent += tmp;
                checkBoxContent = this.addParentDivToContent(checkBoxContent, "class='elements input-message checkboxUserStyleDiv'");
                itemContent += checkBoxContent;
            }else{
                itemContent += inputContent;
            }
            if (value.inputType === "select") {
                itemContent += this.generateOptionSelect(value.options,value.value);
                itemContent += "</select>"
            }

            if(value.type !=="hidden"){
              itemContent = this.addParentDivToContent(itemContent, "class='item'")
            }

            content += itemContent;
        }

    }
    content += "</form>"
    return content;
}

//3 CASES :
//INPUT NOUS VENONS
// add '<div class="item">'
// add      '<label>Prénom</label>'
// add '</div>'
// add [item div,label]
//SELECT
// add '<div class="item">'
// add      '<label>Sexe</label>'
// add      this.generateOptionSelect(optionsSexe,);
// add '</div>'
// add [item div,label,options]
//CHECKBOX
// add '<div class="item">'
// add     '<label for="update_user_mat_ab_id">Sonde abandonnée</label>'
// add     '<div class="elements input-message checkboxUserStyleDiv">'
// add         '<div class="item">'
// add             '<input id="update_user_mat_ab_id" name="user_mat_ab" type="checkbox" class="checkboxUserStyleInput">'
// add         '</div>'
// add         '<div class="item">'
// add             'Le patient est-il porteur d\'une sonde abandonnée ?'
// add         '</div>'
// add     '</div>'
// add '</div>'
// add [item div,label,elements input-message checkboxUserStyleDiv div, item div,item div]

Uluru.prototype.fillValueJsonForm = function (jsonForm,data){
    // console.log(jsonForm.content);
    for (const [key,value] of Object.entries(data)) {
        // console.log("La cle du patient est : "+key);
        // console.log("La valeur du patient est : "+value);
        // console.log(jsonForm.content[key]);
        if (jsonForm.content[key])
            jsonForm.content[key].value = value;
    }
}