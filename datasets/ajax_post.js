const input = document.querySelector('.input')

input.addEventListener('change', function (event) {
    function submit(formId) {
        const form = document.getElementById(`form${formId}`);
        const formData = new FormData(form);
        $.ajax({
            type: "POST",
            url: 'post.php',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                setInterval(loadLog, 2500);
            },
            error: function (xhr, status, error) {
                console.log(xhr, status, error);
            }
        });
        return false;
    }

})