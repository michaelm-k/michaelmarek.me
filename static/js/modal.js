$("#consilio, #rapitup").on("click", function(event) {
   var id = $(this).attr('id');
   $('#imagepreview').attr('src', $('#' + id + ' img').attr('src'));
   $('#imagemodal').modal('show');
});