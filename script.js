var boxes = document.querySelectorAll("div");
var undoStack = [];
function startDrag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);

}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    var targetId = event.target.id;
    var sourceId = event.dataTransfer.getData("text/plain");

    var source = document.getElementById(sourceId);
    var target = document.getElementById(targetId);
    let clone_s = source.cloneNode(true);
    let clone_t = target.cloneNode(true);
    undoStack.push({
        sourceId: sourceId,
        targetId: targetId
    });
    target.parentNode.replaceChild(clone_s, target);

    source.parentNode.replaceChild(clone_t, source);




}

document.addEventListener("dragstart", startDrag, false);
document.addEventListener("dragover", onDragOver, false);
document.addEventListener("drop", onDrop, false);

document.getElementById("undo").addEventListener("click", function () {
    if (undoStack.length > 0) {
        var lastAction = undoStack.pop();

        var source = document.getElementById(lastAction.sourceId);
        var target = document.getElementById(lastAction.targetId);

        let clone_s = source.cloneNode(true);
        let clone_t = target.cloneNode(true);

        target.parentNode.replaceChild(clone_s, target);

        source.parentNode.replaceChild(clone_t, source);
    }
});
