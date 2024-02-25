/*
 Checks for duplicate email and username
 */
package servlets;

import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author gioge
 */
@WebServlet(name = "CheckDuplicates", urlPatterns = {"/CheckDuplicates"})

public class CheckDuplicates extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String type = request.getParameter("type");

        switch (type) {
            case "username":
                checkForUsername(request, response);
                break;
            case "email":
                checkForEmail(request, response);
                break;
            default:
                PrintWriter out = response.getWriter();
                response.setStatus(400);
                out.println("Bad Request");
        }
    }

    /**
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    protected void checkForUsername(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");

        try {
            String username = request.getParameter("username");

            Boolean usernamePetOwn = EditPetOwnersTable.checkValidUserName(username);
            Boolean usernamePetKep = EditPetKeepersTable.checkValidUserName(username);

            response.setStatus((usernamePetOwn && usernamePetKep) ? 200 : 403);

            try (PrintWriter out = response.getWriter()) {
                out.println("{");
                out.println(toJsonString("valid") + ":" + (usernamePetOwn && usernamePetKep));
                out.println("}");
            }
        } catch (ClassNotFoundException err) {
            try (PrintWriter out = response.getWriter()) {
                out.println("{");
                out.println("'error':'Something went wrong with your request'");
                out.println("}");
            }
        }
    }

    protected void checkForEmail(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");

        try {
            String email = request.getParameter("email");

            Boolean emailPetOwn = EditPetOwnersTable.checkValidEmail(email);
            Boolean emailPetKep = EditPetKeepersTable.checkValidEmail(email);

            response.setStatus((emailPetOwn && emailPetKep) ? 200 : 403);

            try (PrintWriter out = response.getWriter()) {
                out.println("{");
                out.println(toJsonString("valid") + ":" + (emailPetOwn && emailPetKep));
                out.println("}");
            }
        } catch (ClassNotFoundException err) {
            try (PrintWriter out = response.getWriter()) {
                out.println("{");
                out.println("'error':'Something went wrong with your request'");
                out.println("}");
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private String toJsonString(String valid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
