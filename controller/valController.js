
let valController = {
    home: function(req, res) {
        res.json({
            "message": "My Rule-Validation API",
            "status": "success",
            "data": {
                "name": "Kadiri Kelvin",
                "github": "@kevthedev007",
                "email": "kevthedev007@gmail.com",
                "mobile": "08130785455",
                "twitter": "@kelvinthedev"
            }
        })
    },

    post: function(req, res) {
        let rule = req.body.rule;
        let data = req.body.data;

        //question (d) if a required field isn't passed
        if(!rule) {
            return res.status(400).json({
                "message": "rule is required.",
                "status": "error",
                "data": null
            })
        }
        if(!data) {
            return res.status(400).json({
                "message": "data is required.",
                "status": "error",
                "data": null
            })
        }

        //question (e) if a field is of the wrong type
        if(typeof rule !== 'object') {
            return res.status(400).json({
                "message": "rule should be an object.",
                "status": "error",
                "data": null
            })
        }
        if(typeof data !== 'object' && Object.prototype.toString.call(data) !== "[object String]") {
            return res.status(400).json({
                "message": "data should be an object or an array or a string.",
                "status": "error",
                "data": null
            })
        }

        //question f




        //question g if the field specified in the rule object is missing from data passed
        let result = data.hasOwnProperty(rule.field);
        if(!result) {
            return res.json({
                "message": `field ${rule.field} is missing from data.`,
                "status": "error",
                "data": null
            })
        }
        

        //question (h) rule test
        //to use dynamic conditions
        let sign;
        switch(rule.condition) {
            case "eq" :
                sign = function(a,b) {
                    return a === b;
                }
                break;
            case "neq" :
                sign = function(a,b) {
                    return a !== b;
                }
                break;
            case "gt" :
                sign = function(a,b) {
                    return a > b;
                }
                break;
            case "gte" :
                sign = function(a,b) {
                    return a >= b;
                };
                break;
            case "contains" :
                sign = function(a,b) {
                    return a.includes(b);
                };
                break;
        }

        //test for success validation or error validation
        if(sign(data[rule.field], rule.condition_value)) {
            return res.status(200).json({
                    "message": `field ${rule.field} sucessfully validated.`,
                    "status": "success",
                    "data": {
                        "validation": {
                            "error": false,
                            "field": rule.field,
                            "field_value": data[rule.field],
                            "condition": rule.condition,
                            "condition_value": rule.condition_value
                        }
                    }
                })
            } else {
                return res.status(400).json({   
                    "message": `field ${rule.field} failed validation.`,
                    "status": "error",
                    "data": {
                        "validation": {
                            "error": true,
                            "field": rule.field,
                            "field_value": data[rule.field],
                            "condition": rule.condition,
                            "condition_value": rule.condition_value
                        }
                    }
                })
            }            
    }
}

module.exports = valController;