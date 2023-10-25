$(document).ready(function () {
    $('#pq').on('input', function () {
        var pq = $(this).val();

        atualizarResultados(pq)});

        function atualizarResultados(pq) {
            $.get('/Pesquisa/PesquisarLivros', 
            { pq: pq}, function (data){
                $('#resultadosPesquisa').html(data);
            });
        }
});