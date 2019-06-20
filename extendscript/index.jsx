var layerTemplate = [{
    "code": "Chr",
    "rule": /Chr/,
    "children": [{
        "code": "{角色名}",
        "rule": /\w+/,
        "children": [{
            "code": "{景别-方向-角度}",
            "rule": /(远|中|近)-(前|后)-(0|45|90|135|180)/,
            "children": []
        }]
    }]
}, {
    "code": "Env",
    "rule": /Env/,
    "children": []
}, {
    "code": "Efx",
    "rule": /Efx/,
    "children": [{
        "code": "{特效名}",
        "rule": /\w+/,
        "children": []
    }]
}]

function hello() {
    alert('Hello World');
};

function _check_layer(layerName, rule) {
    var index = layerName.search(rule);
    if (index) {
        return true;
    }
    return false;
}

function _check_layer_hierarchy(layer, parentLayerName, template) {
    try {
        var regRule = template["rule"];
        var layerName = parentLayerName + '|' + layer.name;
        var flag = _check_layer(layerName, regRule);
        if (flag) {
            var childrenTemplate = template["children"];
            for (var layerSet in layer.layerSets) {
                for (var childTemplate in childrenTemplate) {
                    return _check_layer_hierarchy(layerSet, layerName, childTemplate)
                }
            }
        } else {
            return {
                'layerName': layerName,
                // 'layer': layer,
                'flag': false
            };
        }
    } catch (x_x) {
        alert$.writeln([
            x_x,
            x_x.message,
            x_x.line,
            $.stack,
        ].join("\n"));
    }
}


function _create_layer_hierarchy(layerCode, parentLayer, childrenInfo) {
    try {
        var docRef = app.activeDocument;
        var layer;
        if (parentLayer) {
            layer = parentLayer.layerSets.add();
        } else {
            layer = docRef.layerSets.add();
        }
        layer.name = layerCode;
        for (var i in childrenInfo) {
            var childLayerCode = childrenInfo[i]["code"];
            var childChildrenInfo = childrenInfo[i]["children"];
            _create_layer_hierarchy(childLayerCode, layer, childChildrenInfo);
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
        _create_layer_hierarchy(layerCode, parentLayer, childrenInfo)
    }
};

function check_layers() {
    var docRef = app.activeDocument;
    var children = docRef.layerSets;
    var full_result = [];
    for (var layerSet in layerSets) {
        var result = _check_layer_hierarchy(layerSet, layerTemplate);
        full_result.push(result);
    }
    return full_result;
};

function publish_layers() {

};