document.querySelectorAll('.inline-text').forEach(input => {
    input.setAttribute('autocomplete', 'off');
});


const textareas = document.querySelectorAll('textarea');

textareas.forEach((textarea) => {
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto'; // รีเซ็ตความสูง
        textarea.style.height = textarea.scrollHeight + 'px'; // ปรับความสูงตามเนื้อหา
    });
});

$("#btn_print").off().on('click', function () {
    window.print()
})
