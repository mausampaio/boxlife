function remover(id) {
    var database = firebase.database();
    database.ref('/messages/' + id).remove();
    console.log(id);
    document.getElementById('row').innerHTML = "";
    showData();
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
            nr++;
            var tbody = document.getElementById('row');
            var tr = document.createElement('tr');
            var detalhes = '<td><button type="button" class="btn btn-secondary" data-toggle="collapse" data-target="#'+nr+'" aria-expanded="false" aria-controls="collapse">Detalhes</button></td>';
            // var msg = '<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detalhes">Detalhes</button></td>';
            var th = '<th scope="row">'+nr+'</th>'+'<td>'+childEmail+'</td>'+detalhes+'<td>'+childStatus+'</td><td><button type="button" class="btn btn-block btn-danger" onclick="remover('+childKey+')">Remover</button></td><tr class="collapse" id="'+nr+'"><td colspan="5">'+childMsg+'</td></tr>';
            tr.innerHTML = th;
            tbody.appendChild(tr);
            // modal = document.getElementById('modalMsg');
            // modal.innerHTML = childMsg;
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