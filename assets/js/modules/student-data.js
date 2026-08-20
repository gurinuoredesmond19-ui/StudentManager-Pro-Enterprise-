/* ==========================================================
   STUDENTMANAGER PRO ENTERPRISE
   STUDENT DATA SERVICE
   ========================================================== */

export const StudentDataService = {

    /* ======================================================
       TEMPORARY DATA SOURCE
       This will later be replaced by Firebase.
    ====================================================== */

    async getDashboardSummary() {

        return {

            statistics: {

                totalStudents: 1254,

                newAdmissions: 186,

                pendingEnrollment: 42,

                finalYearStudents: 318

            },

            admissionPipeline: {

                placement: 210,

                verified: 198,

                reported: 176,

                enrolled: 165

            }

        };

    }

};