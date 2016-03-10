

/**
 * node in the dom
 *
 * @type {Object}
 */
var node = {
    header: document.getElementById("header"),
    main: document.getElementById("main"),
    footer: document.getElementById("footer"),
};

/**
 * keep the header in the top, the footer in the bottom,
 * ensure the main's min-height large enough
 *
 * @param  {Object} doc document
 */
(function(doc) {

    var body = doc.body;
    var height = body.offsetHeight;
    var header = node.header.offsetHeight;
    var footer = node.footer.offsetHeight;
    node.main.style.minHeight = height - header - footer + "px";

})(document);

(function(doc) {

    ajax.beforeSend = function (request) {
        if (!/$http(|s)/.test(request.url)) {
            request.headers["X-CSRFToken"] = Cookies.get("csrftoken");
        }
        return request;
    }

})(document);

function signup() {
    var data = {}
    input = document.getElementsByTagName("input");
    for (var i = 0; i < input.length; i++) {
        data[input[i].getAttribute("name")] = input[i].value;
    }
    ajax.send({
        url: "/participant/signup/",
        method: "POST",
        data: data,
        error: function (response) {
            console.log(response.data.message);
        }
    });
}



(function() {

    var template = "<div class=\"team unvote left\">" +
        "<canvas class=\"progress\" width=\"150px\" height=\"150px\"></canvas>" +
        "<div class=\"content\">" +
        "<div class=\"info\">" +
        "<p class=\"name line-text\">{{ name }}</p>" +
        "<p class=\"product line-text\">{{ product }}</p>" +
        "</div>" +
        "<a href=\"javascript: void(0);\" class=\"vote btn\" data-index=\"{{ index }}\">投票</a>" +
        "<span class=\"votes\">{{ votes }}</span>"
        "</div>" +
        "</div>";

    var Progress = function Progress(options) {
        this.element = options.el;
        this.ctx = this.element.getContext("2d");
        this.padding = options.padding || 5;
        this.percent = 0;
        this.angle = 0;
        this.stepSize = options.stepSize || .01;
        this.animation = {};
        this.color = options.color || "#1976d2";
        this.lineWidth = options.lineWidth || 10;
        this.lineCap = options.lineCap || "round";

        this.resize();
        this.update(options.percent || 0);

        window.addEventListener("resize", this.resize.bind(this));
    }

    Progress.prototype.resize = function () {
        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
        this.element.setAttribute("width", this.width);
        this.element.setAttribute("height", this.height);

        this.size = Math.min(this.width, this.height) - 2 * this.padding;
        this.centerX = this.width / 2.0;
        this.centerY = this.height / 2.0;
        this.radius = (this.size - this.lineWidth) / 2.0;
        this.angleOffset = Math.acos((2 - Math.pow(this.lineWidth / 2.0, 2) / Math.pow(this.radius, 2)) / 2);
        this.redraw();
    }

    Progress.prototype.setStyle = function (color, lineWidth, lineCap) {
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = this.lineCap;
    }

    Progress.prototype.redraw = function () {
        this.setStyle();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, Math.PI / 2, Math.PI / 2 + Math.PI * 2 * this.percent, false);
        this.ctx.stroke();
    }

    Progress.prototype.step = function (delta) {
        this.percent += this.stepSize * delta;
        this.redraw();
    }

    Progress.prototype.animate = function () {
        var delta = (this.percent > this.animation.target) ? -1 : 1;
        if (delta * this.animation.delta > 0) {
            requestAnimationFrame(this.animate.bind(this));
            this.step(delta);
        }
    }

    Progress.prototype.update = function (percent) {
        this.animation = {
            target: percent,
            delta: (this.percent > percent) ? -1 : 1,
        };
        this.animate();
    }

    var Team = function Team(parent, el, template, team) {
        this.parent = parent;
        this.parentElement = el;
        this.id = team.id;
        this.name = team.name;
        this.product = team.product;
        this.percent = team.percent;
        this.votes = team.votes;
        this.percent = 0;

        var outer = template.replace(/{{ (\w+) }}/g, function () {
            return team[arguments[1]];
        });

        var node = document.createElement("div");
        node.innerHTML = outer;

        this.element = el.appendChild(node.children[0]);

        this.padding = Number(window.getComputedStyle(this.element).padding.replace(/px/, ""));
        this.canvas = this.element.querySelector("canvas");
        this.content = this.element.querySelector(".content");
        this.votes = this.element.querySelector(".votes");
        this.contentHeight = this.content.offsetHeight;
        this.progress = new Progress({ el: this.canvas, percent: 0 });

        this.resize();
        window.addEventListener("resize", this.resize.bind(this));

    }

    Team.prototype.resize = function () {
        var width = this.element.offsetWidth;
        this.element.style.height = width + "px";
        this.content.style.width = this.content.style.height = width - 30 + "px";
        this.content.style.paddingTop = (width - this.contentHeight - 30) / 2.0 + "px";
        this.progress.resize();
    }

    Team.prototype.update = function (percent, votes) {
        if (typeof percent === "number") {
            this.percent = percent;
            this.progress.update(percent);
        }
        if (typeof votes === "number") {
            this.votes = votes;
            this.votes.innerHTML = votes;
        }
    }

    Team.prototype.changeState = function () {
        this.element.className = this.element.className.replace("unvote", "voted");
    }

    var Vote = function Vote(el, template, remain) {
        this.element = el;
        this.template = template;
        this.teams = [];
        this.total = 0;
        this.remain = remain;
        this.init();

        el.addEventListener("click", this.click.bind(this));
    }

    Vote.prototype.init = function () {
        ajax.send({
            url: "/vote/init/",
            success: function (response) {
                var teams = response.data.data || [];
                teams.forEach(function (team, index) {
                    team.index = index + 1;
                    this.total += team.votes;
                    this.teams.push({
                        id: team.id,
                        team: new Team(this, this.element, this.template, team),
                        value: team.votes,
                        state: true,
                    });
                }.bind(this));
                this.update(0);

                // setInterval(this.update.bind(this), 1000);
            }.bind(this),
        });
    }

    Vote.prototype.update = function () {
        if (!arguments.length) {
            ajax.send({
                url: "/vote/update/",
                success: function (response) {
                    this.update(response.data.data);
                }.bind(this),
            });
        }
        else if (arguments[0] === 0) {
            this.teams.forEach(function (team) {
                team.team.update(1.0 * team.value / this.total);
            }.bind(this));
        }
        else if (arguments[0] instanceof Array) {
            this.total = 0;
            arguments[0].forEach(function (value, index) {
                this.total += value;
                this.teams[index].team.update(null, value);
                this.teams[index].value = value;
            }.bind(this));
            this.update(0);
        }
    }

    Vote.prototype.click = function (event) {
        if (!this.remain) { return; }

        var target = event.target;
        var index = 0;
        if (index = Number(target.getAttribute("data-index"))) {
            ajax.send({
                url: "/vote/submit/",
                method: "POST",
                data: { id: this.teams[index - 1].id },
                success: function () {
                    this.remain--;
                    this.teams[index - 1].state = false;
                    this.teams[index - 1].team.update(null, ++this.teams[index - 1].value);
                    this.teams[index - 1].team.changeState();
                    this.total++;
                    this.update(0);

                    if (!this.remain) {
                        this.teams.forEach(function (team) {
                            if (team.state) {
                                team.state = false;
                                team.team.changeState();
                            }
                        });
                    }
                }.bind(this),
            });
        }
    }

    var vote = new Vote(node.main, template, 2);

})();