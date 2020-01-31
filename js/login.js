function remover(key) {
    var database = firebase.database();
    database.ref('/messages/' + key).remove();
    console.log(key);
    document.getElementById('row').innerHTML = "";
    showData();
}

function modalUpdate(key) {
    var database = firebase.database();
    database.ref('/messages/' + key).once('value', function(snapshot){
        console.log(snapshot.val());
        var itemMsg = snapshot.val().mensagem;
        var itemEmail = snapshot.val().email;
        var itemNome = snapshot.val().nome;
        modalMsg = document.getElementById('modalMsg');
        modalTitle = document.getElementById('modalTitle');
        modalNome = document.getElementById('modalNome');
        modalMsg.innerHTML = '<p>'+itemMsg+'</p>';
        modalTitle.innerHTML = itemEmail;
        modalNome.innerHTML = 'Nome: '+itemNome;
        modalButton = document.getElementById('modalButton');
        modalButton.setAttribute( "onClick", 'update('+key+')');
    });
}

function update(key){
    var database = firebase.database();
    database.ref('/messages/' + key).update({
        status: 'Respondido'
    });
}

function showData() {
    var db = firebase.database();
    var ref = db.ref("messages");
    ref.on('value', function(snapshot) {
        var nr = 0;
        document.getElementById('row').innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childEmail = childSnapshot.val().email;
            var childMsg = childSnapshot.val().mensagem;
            var childStatus = childSnapshot.val().status;
            if (childStatus == 'Respondido'){
                var spanClass = 'badge badge-success respondido';
            }else{
                var spanClass = 'badge badge-danger naorespondido';
            };
            nr++;
            var tbody = document.getElementById('row');
            var tr = document.createElement('tr');
            //var detalhes = '<td><button type="button" class="btn btn-secondary" data-toggle="collapse" data-target="#'+nr+'" aria-expanded="false" aria-controls="collapse">Detalhes</button></td>';
            var detalhes = '<div class="colAcao col-md-6 col-sm-12 mx-auto"><button type="button" class="btn btn-block btn-primary" data-toggle="modal" data-target="#detalhes" onclick="modalUpdate('+childKey+')">Detalhes</button></div>';
            var th = '<th scope="row">'+nr+'</th>'+'<td>'+childEmail+'<span class="pull-right '+spanClass+'">'+childStatus+'</span></td><td><div class="divAcao row">'+detalhes+'<div class="col-md-6 col-sm-12 mx-auto"><button type="button" class="btn btn-block btn-danger" onclick="remover('+childKey+')">Remover</button></div></div></td>';
            tr.innerHTML = th;
            tbody.appendChild(tr);
            console.log(childKey);
            console.log(childEmail);
        });
    });
}

showData();

$(document).ready(function(){
    $("#busca").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#row tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});