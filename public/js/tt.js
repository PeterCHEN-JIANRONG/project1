
  
  $(document).ready(function(){
    $(".upper p, .middle_right1 p, .middle_right1 li").click(function(){
        $(this).hide();
    });

    $("#show_b").click(function(){
      $("p, li").show();
    });

    $("#change, #changeb").click(function(){
      $.ajax({url: "txt/testmessage1.txt", success: function(result){
          $("#lp33").html(result);
      }});
    });
  });

