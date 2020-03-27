window.onload = function() {
    document.getElementById('avatar-upload').onchange = () => {
        this.form.submit();
    }
}