
; (function (window) {

    "use strict";

    var extend = function extend(dest) {
        var key;
        var src;
        var len = 0;
        while ((++len) < arguments.length) {
            src = arguments[len];
            for (key in src) {
                if (src.hasOwnProperty(key)) {
                    dest[key] = src[key];
                }
            }
        }
        return dest;
    }

    var Request = function Request(options) {
        extend(this, options);
    }

    var Response = function Response(xhr, request) {
        this.status = xhr.status;
        this.statusText = xhr.statusText;
        this.success = (this.status >= 200) && (this.status < 400);
        this.headers = xhr.getResponseHeader;
        this.request = request;

        try {
            this.data = JSON.parse(xhr.response || "{}");
        }
        catch(e) {
            this.data = xhr.response;
        }
    }

    var ajax = window.ajax = {};

    ajax.options = {
        url: "",
        method: "GET",
        headers: {},
        async: true,
        data: {},
    };

    ajax.beforeSend = null;

    ajax.send = function send() {
        var options;
        if (typeof arguments[0] === "string") {
            options.url = arguments[0];
        }
        else {
            options = arguments[0];
        }
        if (typeof options.url !== "string") {
            console.log("the request url must be a string type.");
            return;
        }

        var request = new Request(extend({}, this.options, options));
        if (this.beforeSend instanceof Function) {
            request = this.beforeSend(request) || request;
        }

        var xhr = new XMLHttpRequest();
        xhr.open(request.method, request.url, request.async);

        var header;
        for (header in request.headers) {
            xhr.setRequestHeader(header, request.headers[header]);
        }

        if (request.method === "POST") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                var response = new Response(this, request);
                if (response.success && (options.success instanceof Function)) {
                    options.success(response);
                }
                else if (!response.success && (options.error instanceof Function)) {
                    options.error(response);
                }
            }
        };

        var stringify = ""
        for (var key in request.data) {
            stringify += key + "=" + request.data[key] + ";";
        }
        xhr.send(stringify);
    };

})(window);
