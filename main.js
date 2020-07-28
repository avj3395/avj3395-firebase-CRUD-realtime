


const db = firebase.database();
const rootref = db.ref('users');

var d = new Date();
var t = d.getTime();
var counter = t;
  


   
document.getElementById("form").addEventListener("submit",(e)=>{
    var names = document.getElementById("name").value;
    var work = document.getElementById("work").value;
e.preventDefault();

    createUser(names,work);
    form.reset();

});

function createUser(inname,inwork){
    console.log(counter);
    counter+=1;
    console.log(counter);

    rootref.child(counter).set({
        user_name: inname,
        user_work: inwork,
        user_id: counter
    });
    document.getElementById("cardsection").innerHTML='';
    read_Data();
    
}

function read_Data(){
    var data = firebase.database().ref("users/");
    data.on("child_added",function(data){

        var userdata = data.val();
        console.log(userdata);

        document.getElementById("cardsection").innerHTML+=`
        
        <div class="card mb-3">
        <div class="card-body">
        <h5 class="card-title">${userdata.user_name}</h5>
        <p class="card-text">${userdata.user_work}</p>
        <button type="submit" style"color:white" class="btn btn-warning" onclick="update_data(${userdata.user_id},'${userdata.user_name}','${userdata.user_work}')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
        <button type="submit" style"color:white" class="btn btn-danger" onclick="delete_data(${userdata.user_id})"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
        </div>
        </div>
        
        `;

    });
    
}

function reset(){
    document.getElementById("firstsection").innerHTML=`
    <form action="" class="border p-4 mb-4" id="form">
                    <div class="form-group">
                     
                        <label for="">Name</label><br>
                        <input type="text" name="" id="name" class="form-control" placeholder="name">
                    
                    </div>

                    <div class="form-group">
                     
                        <label for="">Work</label><br>
                        <input type="text" name="" id="work" class="form-control" placeholder="work">
                    
                    </div>

                    <button type="submit" id="button1" class="btn btn-primary" > <i class="fa fa-plus-circle" aria-hidden="true"></i> ADD</button> 
                    <button style="display: none;" id="button2" class="btn btn-success" ><i class="fa fa-refresh" aria-hidden="true"></i> UPDATE</button>
                    <button style="display: none;" id="button2" class="btn btn-danger" ><i class="fa fa-trash" aria-hidden="true"></i> Cancel</button>
                </form>
    `;
    document.getElementById("form").addEventListener("submit",(e)=>{
        e.preventDefault();
        
        createUser(document.getElementById("name").value,document.getElementById("work").value);
        form.reset();
        
        });


}

function update_data(id,name,work){

    document.getElementById("firstsection").innerHTML=`
    <form action="" class="border p-4 mb-4" id="form2">
                    <div class="form-group">
                     
                        <label for="">Name</label><br>
                        <input type="text" name="" id="name" class="form-control" placeholder="name">
                    
                    </div>

                    <div class="form-group">
                     
                        <label for="">Work</label><br>
                        <input type="text" name="" id="work" class="form-control" placeholder="work">
                    
                    </div>

                    <button style="display: none;" type="submit" id="button1" class="btn btn-primary" > <i class="fa fa-plus-circle" aria-hidden="true"></i> ADD</button> 
                    <button type"submit" style="display: inline-block;" id="button2" class="btn btn-success" ><i class="fa fa-refresh" aria-hidden="true"></i> UPDATE</button>
                    <button type"submit" style="display: inline-block;" id="button3" class="btn btn-danger" ><i class="fa fa-times" aria-hidden="true"></i> Cancel</button>
                </form>

                `;

                
                
                document.getElementById("form2").addEventListener("submit",(e)=>{
                    e.preventDefault();
                });

                document.getElementById("button3").addEventListener("click",(e)=>{
                    reset();
                });

                document.getElementById("button2").addEventListener("click",(e)=>{
                    update_data2(id,document.getElementById("name").value,document.getElementById("work").value);
                });

                document.getElementById("name").value=name;
                document.getElementById("work").value=work;

                


    
}

function update_data2(id,name,work){

    rootref.child(id).set({
        user_name: name,
        user_work: work,
        user_id: id
    });

    document.getElementById("cardsection").innerHTML='';
    read_Data();
    reset();



}

function delete_data(userid){

    rootref.child(userid).remove();
    reset();
    document.getElementById("cardsection").innerHTML='';
    read_Data();
    


}