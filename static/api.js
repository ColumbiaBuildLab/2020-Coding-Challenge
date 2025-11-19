class ApiService {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  increaseScore(teamId) {
    return $.ajax({
      type: "POST",
      url: this.baseUrl + "/increase_score",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ id: teamId })
    });
  }

  handleError(error, request, status) {
    console.log("API Error:");
    console.log("Request:", request);
    console.log("Status:", status);
    console.log("Error:", error);
  }
}
