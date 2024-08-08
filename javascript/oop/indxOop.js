
class ProjectFormHandler {
  constructor(formId, containerId) {
    this.form = document.getElementById(formId);
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  getMonthDiff(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonth = start.getFullYear() * 12 + start.getMonth();
    const endMonth = end.getFullYear() * 12 + end.getMonth();

    return endMonth - startMonth;
  }

  getDayDiff(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();

    return diff / (1000 * 60 * 60 * 24);
  }

  renderProjectItem(data) {
    const reader = new FileReader();
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    reader.onload = (event) => {
      const imageData = event.target.result;
      const img = document.createElement("img");

      img.src = imageData;
      img.alt = "img-project";
      img.innerHTML = "";

      projectCard.appendChild(img);

      const projectTitle = document.createElement("div");
      projectTitle.className = "project-title";

      const h3 = document.createElement("h3");
      h3.textContent = data.title;
      projectTitle.appendChild(h3);

      const p = document.createElement("p");
      p.textContent = `Duration: ${data.durations}`;
      projectTitle.appendChild(p);

      projectCard.appendChild(projectTitle);

      const projectDescription = document.createElement("div");
      projectDescription.className = "project-description";

      const pDesc = document.createElement("p");
      pDesc.textContent = data.description;
      projectDescription.appendChild(pDesc);

      projectCard.appendChild(projectDescription);

      const projectTech = document.createElement("div");
      projectTech.className = "project-tech";

      data.tech.forEach((tech) => {
        const imgTech = document.createElement("img");
        imgTech.src = `asset/photo/${tech}.png`;
        imgTech.alt = "img-tech";
        imgTech.width = 30;
        projectTech.appendChild(imgTech);
      });

      projectCard.appendChild(projectTech);

      const projectAction = document.createElement("div");
      projectAction.className = "project-action";

      const btnEdit = document.createElement("button");
      btnEdit.className = "btn-edit";
      btnEdit.textContent = "Edit";
      projectAction.appendChild(btnEdit);

      const btnDelete = document.createElement("button");
      btnDelete.className = "btn-delete";
      btnDelete.textContent = "Delete";
      projectAction.appendChild(btnDelete);

      projectCard.appendChild(projectAction);

      this.container.appendChild(projectCard);
    };

    reader.readAsDataURL(data.image);
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    const selectedCheckbox = [];
    const checkboxes = document.getElementsByName("tech");

    for (let index = 0; index < checkboxes.length; index++) {
      const element = checkboxes[index];

      if (element.checked) {
        selectedCheckbox.push(element.value);
      }
    }

    const days = this.getDayDiff(data.start_date, data.end_date);
    const months = this.getMonthDiff(data.start_date, data.end_date);

    delete data.start_date;
    delete data.end_date;

    const obj = {
      ...data,
      tech: selectedCheckbox,
      durations: months === 0 ? `${days} Day(s)` : `${months} Month(s)`,
    };

    this.renderProjectItem(obj);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ProjectFormHandler("projectForm", "projects");
});
