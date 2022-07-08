/**
 * PromptJS v1.0 Neir Besnoi
 * Dependencies (in order)
    => jQuery v2.1.3
    => Bootstrap v4.0.0
 * Usage
    => inputModal(title,
                [label1,label2,...],
                (input1,input2,...)=>{
        //do stuff with inputs
        })
 * Example
   => inputModal("Greetings",["What's ur name?"],function (name){
        console.log(name,`Well, Hello ${name}`)
      })
 * Caveats :
    > PromptJS doesn't synthesize inputs for you
    > PromptJS has same button text for all modals
    > Modal Titles MUST be unique
 * Feel free to customize it as per your use :D
*/

let prompt={},_modals = {}, _noOfModals = 0

prompt.message=(title,body)=>{
    //if modal already defined just call it
    if (_modals[title]){
        $(`#dialog${_modals[title]}`).modal()
        return
    }
    modalID=_modals[title]=_noOfModals++

    let modalHTML = `
        <div class="modal fade" id="dialog${modalID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document" style="width: 75%  !important;
        margin: 0 auto ;">
            <div class="modal-content">
            <div class="modal-header" style="background:#f8f9fa">
                <h5 class="modal-title" id="dialogHeading${modalID}">${title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ${body}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="dialogSubmit${modalID}">OK</button>
            </div>
            </div>
        </div>
        </div>`
    $('body').append(modalHTML)
    $(`#dialog${modalID}`).modal()
}

prompt.inputModal=(title,input,callback)=>{
    if (!callback)
        callback = ()=>{}
    
    //if modal already defined just call it
    if (_modals[title]){
        $(`#dialog${_modals[title]}`).modal()
        return
    }

    modalID=_modals[title]=_noOfModals++

    let modalHTML = `
        <div class="modal fade" id="dialog${modalID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document" style="width: 75%  !important;
        margin: 0 auto ;">
            <div class="modal-content">
            <div class="modal-header" style="background:#f8f9fa">
                <h5 class="modal-title" id="dialogHeading${modalID}">${title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>`
                for (i in input){
                    modalHTML+=
                    `<div class="form-group">
                    <label for="dialog${modalID}Input${i}" class="col-form-label">${input[i]}</label>
                    <input type="text" class="form-control" id="dialog${modalID}Input${i}">
                    </div>`
                }
                modalHTML+=`
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="dialogSubmit${modalID}">OK</button>
            </div>
            </div>
        </div>
        </div>`
    $('body').append(modalHTML)
    $(`#dialog${modalID}`).modal()
    $(`#dialogSubmit${modalID}`).click(()=>{
        let inputs=[]
        for (i in input){
            inputs.push($(`#dialog${modalID}Input${i}`).val())
            $(`#dialog${modalID}Input${i}`).val('')
        }
        callback(...inputs)
    })
}