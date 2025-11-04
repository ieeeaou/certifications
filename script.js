// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateCertificateBtn");
    const printBtn = document.getElementById("printCertificateBtn");

    const certificationTitle = document.getElementById("certification-title");
    const certifiedName = document.getElementById("certifiedName");
    const certificationText = document.getElementById("certificationText");

            const type = document.getElementById("certificationType").value;


    generateBtn.addEventListener("click", () => {
        const type = document.getElementById("certificationType").value;
        const name = document.getElementById("name").value.trim();
        const content = document.getElementById("certificate-content").value.trim();

        if (!name || !content) {
            alert("Please enter both name and certificate content.");
            return;
        }

        // Update certificate content
        certificationTitle.textContent =" Certificate of " + type.charAt(0).toUpperCase() + type.slice(1);
        certifiedName.textContent = name;
        certificationText.textContent = content;
    });

    printBtn.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const certificate = document.querySelector(".certificationarea");

        // Use html2canvas to convert certificate area to canvas
        html2canvas(certificate, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "pt",
                format: "a4"
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Scale image to fit A4 landscape
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
            pdf.save(`Certificate of ${type} to ${certifiedName.textContent}.pdf`);
        });
    });
});
