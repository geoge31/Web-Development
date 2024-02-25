/*
 This servlet is used to post a new user in the database
 */
package servlets;

import database.tables.EditPetKeepersTable;
import database.tables.EditPetOwnersTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author gioge
 */
@WebServlet(name = "NewUser", urlPatterns = {"/NewUser"})
public class NewUser extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException {
        response.setContentType("text/html;charset=UTF-8");
        String type = request.getParameter("type");

        switch (type) {
            case "petowner":
                petOwner_SignUp(request, response);
                break;
            case "petkeeper":
                petKeeper_SignUp(request, response);
                break;

            default:
                PrintWriter out = response.getWriter();
                response.setStatus(400);
                out.println("Bad request");
        }
    }

    protected void petOwner_SignUp(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException {
        response.setContentType("application/json");
        String petowner_data;

        try {
            petowner_data = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            EditPetOwnersTable edt = new EditPetOwnersTable();
            edt.addPetOwnerFromJSON(petowner_data);
            PrintWriter out = response.getWriter();
            response.setStatus(200);
            out.println("Pet Owner registered successfuly");

        } catch (ClassNotFoundException err) {
            try (PrintWriter out = response.getWriter()) {
                out.println("{");
                out.println("'error':'Something went wrong with your request'");
                out.println("}");
            }
        }
    }

    protected void petKeeper_SignUp(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException {

        String petkeeper_data;
        response.setContentType("application/json");

        try {
            petkeeper_data = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            EditPetKeepersTable edt = new EditPetKeepersTable();
            edt.addPetKeeperFromJSON(petkeeper_data);
            PrintWriter out = response.getWriter();
            response.setStatus(200);
            out.println("Pet Keeper registered successfuly");

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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(NewUser.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(NewUser.class.getName()).log(Level.SEVERE, null, ex);
        }
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

}

