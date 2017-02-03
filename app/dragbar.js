let dragging = false;
function dragstart(element) {
    element.preventDefault();
    dragging = true;
}

function dragmove(element) {
    if (dragging == false) return;
    let percentage = (element.pageX / window.innerWidth) * 100;
    if (percentage > 10 && percentage < 90) {
        let mainPercentage = 100 - percentage;
        document.getElementById('main-window').style.width = percentage + '%';
        document.getElementById('code-preview').style.width = mainPercentage + '%';
        document.getElementById('code-preview').style.width = mainPercentage + '%';        
        document.getElementById("dragbar").style.left = percentage + '%';
    }
}

function dragend() {
    dragging = false;
}

exports.init = () => {
    document.getElementById('dragbar').addEventListener('mousedown', e=> { dragstart(e); });
    document.getElementById('dragbar').addEventListener('touchstart', e=> { dragstart(e); });
    window.addEventListener('mousemove', (e) => { dragmove(e); });
    window.addEventListener('touchmove',  (e) => { dragmove(e); });
    window.addEventListener('mouseup', dragend);
    window.addEventListener('touchend', dragend);
}
