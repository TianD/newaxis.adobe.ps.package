var layerTemplate = [{
    "code": "Chr",
    "children": [{
        "code": "{角色名}",
        "children": [],
    }, {
        "code": "{景别-角度}",
        "children": []
    }]
}, {
    "code": "Env",
    "children": []
}, {
    "code": "Efx",
    "children": [{
        "code": "{特效名}",
        "children": []
    }]
}]

function hello() {
    alert('Hello World');
};

function create_layer_hierarchy(layerCode, parentLayer, childrenInfo) {
    try {
        var docRef = app.activeDocument;
        var layer;
        if (parentLayer) {
            layer = parentLayer.layerSets.add();
        }
        else{
            layer = docRef.layerSets.add();
        }
        layer.name = layerCode;
        for (var i in childrenInfo) {
            var childLayerCode = childrenInfo[i]["code"];
            var childChildrenInfo = childrenInfo[i]["children"];
            create_layer_hierarchy(childLayerCode, layer, childChildrenInfo);
        }
    } catch (x_x) {
        alert([
            x_x,
            x_x.message,
            x_x.line,
            $.stack,
        ].join("\n"));
    }

}

function create_layers() {
    var parentLayer = null;
    for (var index in layerTemplate) {
        var layerCode = layerTemplate[index]["code"];
        var childrenInfo = layerTemplate[index]["children"];
        create_layer_hierarchy(layerCode, parentLayer, childrenInfo)
    }
};

function check_layers() {

};

function publish_layers() {

};