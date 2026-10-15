from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():

    result = None

    if request.method == "POST":

        num1 = float(request.form["num1"])
        num2 = float(request.form["num2"])
        operator = request.form["operator"]

        if operator == "+":
            result = num1 + num2

        elif operator == "-":
            result = num1 - num2

        elif operator == "*":
            result = num1 * num2

        elif operator == "/":
            if num2 != 0:
                result = num1 / num2
            else:
                result = "Cannot divide by zero"

    return render_template("index.html", result=result)


# Make the service worker accessible from the website's root
@app.route("/service-worker.js")
def service_worker():
    response = send_from_directory("static", "service-worker.js")
    response.headers["Service-Worker-Allowed"] = "/"
    return response


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)
