/*
    This servlet is used to post a new message
 */
package servlets;

import database.tables.EditMessagesTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Message;

/**
 *
 * @author gioge
 */
@WebServlet(name = "NewMessage", urlPatterns = {"/NewMessage"})

public class NewMessage extends HttpServlet {

    private static final long serialVersionUID = 1L;

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
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet NewMessage</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet NewMessage at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
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
        int booking_id = Integer.parseInt(request.getParameter("booking_id"));

        try {
            // Retrieve messages from the database based on the booking_id
            EditMessagesTable editMessagesTable = new EditMessagesTable();
            ArrayList<Message> messages = editMessagesTable.databaseToMessage(booking_id);

            // Set the messages as a request attribute
            request.setAttribute("messages", messages);

            // Forward the request to your HTML page
            RequestDispatcher dispatcher = request.getRequestDispatcher("your_html_page.jsp");
            dispatcher.forward(request, response);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            response.getWriter().write("Error retrieving messages.");
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

        String newMessageContent = request.getParameter("newMessage");
        String sender = request.getParameter("sender");
        int booking_id = Integer.parseInt(request.getParameter("booking_id"));

        // Create a new Message instance
        Message newMessage = new Message();
        newMessage.setBooking_id(booking_id);
        newMessage.setMessage(newMessageContent);
        newMessage.setSender(sender);

        // Set the current date and time for the message
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        newMessage.setDatetime(sdf.format(date));

        try {
            // Add the new message to the database
            EditMessagesTable editMessagesTable = new EditMessagesTable();
            editMessagesTable.createNewMessage(newMessage);

            // Redirect to the same servlet to display the updated messages
            response.sendRedirect(request.getContextPath() + "/MessageServlet?booking_id=" + booking_id);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            response.getWriter().write("Error adding new message.");
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
