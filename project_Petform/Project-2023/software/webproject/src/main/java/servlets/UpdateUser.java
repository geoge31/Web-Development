/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import database.tables.EditPetKeepersTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.PetKeeper;

/**
 *
 * @author gioge
 */
@WebServlet(name = "UpdateUser", urlPatterns = {"/UpdateUser"})

public class UpdateUser extends HttpServlet {

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

        EditPetKeepersTable eupk = new EditPetKeepersTable();
        String petKeeper_data;
        response.setContentType("application/json");
        petKeeper_data = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        PetKeeper newUser = eupk.jsonToPetKeeper(petKeeper_data);
        try {
            try {
                eupk.updatePetKeeper(
                        newUser.getUsername(),
                        newUser.getPassword(),
                        newUser.getFirstname(),
                        newUser.getLastname(),
                        newUser.getBirthdate(),
                        newUser.getGender(),
                        newUser.getCountry(),
                        newUser.getCity(),
                        newUser.getAddress(),
                        newUser.getTelephone(),
                        newUser.getPersonalpage(),
                        newUser.getJob(),
                        newUser.getLat(),
                        newUser.getLon(),
                        newUser.getProperty(),
                        newUser.getPropertydescription(),
                        newUser.getCatkeeper(),
                        newUser.getDogkeeper(),
                        newUser.getCatprice(),
                        newUser.getDogprice()
                );

                response.setStatus(200);
                try (PrintWriter out = response.getWriter()) {
                    out.println("Updated succesfuly!");
                }
            } catch (SQLException err) {
                System.out.println(err);
            }
        } catch (ClassNotFoundException err) {
            System.out.println(err);
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

}
