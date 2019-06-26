var layerTemplate = [{
    "code": "Chr",
    "rule": /Chr/,
    "type": "LayerSet",
    "children": [{
        "code": "{角色名}",
        "rule": /[a-zA-Z0-9_]+/,
        "type": "LayerSet",
        "children": [{
            "code": "{景别-方向-角度}",
            "rule": /^(远|中|近)+-(前|后)+-(0|45|90|135|180)+$/,
            "type": "LayerSet",
            "children": []
        }]
    }]
}, {
    "code": "Env",
    "rule": /Env/,
    "type": "LayerSet",
    "children": [{
        "code": "{环境名}",
        "rule": /[a-zA-Z0-9_]+/,
        "type": "ArtLayer"
    }]
}, {
    "code": "Efx",
    "rule": /Efx/,
    "type": "LayerSet",
    "children": [{
        "code": "{特效名}",
        "rule": /[a-zA-Z0-9_]+/,
        "type": "LayerSet",
        "children": []
    }]
}]

function hello() {
    // alert('Hello World');
    return "hello world"
};

function _check_layer(layer, regRule, typeRule) {
    try {
        var layerName = layer.name;
        var layerType = layer.typename;
        if (layerType !== typeRule) {
            return false;
        }
        var index = layerName.search(regRule);
        if (index) {
            return true;
        }
        return false;
    } catch (x_x) {
        alert$.writeln([
            x_x.message,
            x_x.line,
            $.stack,
        ].join("\n"));
    }
}

function _check_layer_hierarchy(layer, parentLayerName, template, result) {
    try {
        var regRule = template["rule"];
        var typeRule = template["type"];
        var layerName = parentLayerName + '|' + layer.name;
        var flag = _check_layer(layer, regRule, typeRule);
        if (flag) {
            if (layer.typename === 'LayerSet') {
                var childrenTemplate = template["children"];
                var subLayers = layer.layers
                for (var i = 0; i < subLayers.length; i++) {
                    for (var j in childrenTemplate) {
                        var subflag = _check_layer_hierarchy(subLayers[i], layerName, childrenTemplate[j], result)
                        if (subflag) {
                            break
                        }
                    }
                    result.push({
                        key: result.length + 1,
                        name: layerName + '|' + subLayers[i].name,
                        flag: String(subflag)
                    })
                }
            }
        }
        return flag
    } catch (x_x) {
        alert([
            x_x,
            x_x.message,
            x_x.line,
            $.stack,
        ].join("\n"));
    }
}


function _create_layer_hierarchy(layerType, layerCode, parentLayer, childrenInfo) {
    try {
        var docRef = app.activeDocument;
        var layer;
        if (parentLayer) {
            if (layerType === 'LayerSet') {
                layer = parentLayer.layerSets.add();
                layer.name = layerCode;
                for (var i in childrenInfo) {
                    var childLayerCode = childrenInfo[i]["code"];
                    var childChildrenInfo = childrenInfo[i]["children"];
                    var childLayerType = childrenInfo[i]["type"];
                    _create_layer_hierarchy(childLayerType, childLayerCode, layer, childChildrenInfo);
                }
            } else {
                layer = parentLayer.artLayers.add();
                layer.name = layerCode;
            }
        } else {
            if (layerType === 'LayerSet') {
                layer = docRef.layerSets.add();
                layer.name = layerCode;
                for (var i in childrenInfo) {
                    var childLayerCode = childrenInfo[i]["code"];
                    var childChildrenInfo = childrenInfo[i]["children"];
                    var childLayerType = childrenInfo[i]["type"];
                    _create_layer_hierarchy(childLayerType, childLayerCode, layer, childChildrenInfo);
                }
            } else {
                layer = docRef.artLayers.add();
                layer.name = layerCode;
            }
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
        var layerType = layerTemplate[index]["type"];
        _create_layer_hierarchy(layerType, layerCode, parentLayer, childrenInfo)
    }
};

function check_layers() {
    try {
        var layers = app.activeDocument.layers;
        var full_result = [];
        var rootname = '';
        var flag = false;
        for (var i = 0; i < layers.length; i++) {
            for (var j in layerTemplate) {
                flag = _check_layer_hierarchy(layers[i], rootname, layerTemplate[j], full_result);
                if (flag) {
                    break
                }
            }
            full_result.push({
                key: full_result.length + 1,
                name: rootname + '|' + layers[i].name,
                flag: String(flag)
            })
        }
        var json_result = JSON.stringify(full_result);
        return json_result;
    } catch (x_x) {
        alert([
            x_x, 
            x_x.message,
            x_x.line,
            $.stack,
        ].join("\n"));
    }

};

function publish_layers() {
    return JSON.stringify([{
        key: 1,
        name: 'abc',
        flag: 'false'
    }, {
        key: 2,
        name: 'def',
        flag: 'true'
    }])
};