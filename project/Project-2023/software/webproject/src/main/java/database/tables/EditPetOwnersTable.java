/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import mainClasses.PetOwner;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Mike
 */
public class EditPetOwnersTable {

    /**
     *
     * @param username
     * @return
     * @throws ClassNotFoundException
     */
    // Check if there is alredy a user with the given username
    public static Boolean checkValidUserName(String username) throws ClassNotFoundException {
        Boolean newValid = true;
        Statement newStatement = null;
        Connection newConnection = null;

        try {

            newConnection = DB_Connection.getConnection();
            newStatement = newConnection.createStatement();

            StringBuilder insQuery = new StringBuilder();

            insQuery.append("SELECT * FROM petowners ")
                    .append(" WHERE ")
                    .append(" username = ").append("'").append(username).append("';");

            newStatement.execute(insQuery.toString());

            if (newStatement.getResultSet().next() == true) {
                System.out.println("#DB_ConnectionDB: There is a registered member with this username");
                newValid = false;
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(EditPetOwnersTable.class.getName()).log(Level.SEVERE, null, ex);
        }
        return newValid;

    }

    // Check if there is alredy a user with the given email
    public static Boolean checkValidEmail(String email) throws ClassNotFoundException {

        Boolean newValid = true;
        Statement newStatement = null;
        Connection newConnection = null;

        try {

            newConnection = DB_Connection.getConnection();
            newStatement = newConnection.createStatement();

            StringBuilder insQuery = new StringBuilder();

            insQuery.append("SELECT * FROM petowners ")
                    .append(" WHERE ")
                    .append(" email = ").append("'").append(email).append("';");

            newStatement.execute(insQuery.toString());

            if (newStatement.getResultSet().next() == true) {
                System.out.println("#DB_ConnectionDB: There is a registered member with this email");
                newValid = false;
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(EditPetKeepersTable.class.getName()).log(Level.SEVERE, null, ex);
        }
        return newValid;
    }

    public void addPetOwnerFromJSON(String json) throws ClassNotFoundException {
         PetOwner user=jsonToPetOwner(json);
         addNewPetOwner(user);
    }

    public PetOwner jsonToPetOwner(String json) {
         Gson gson = new Gson();

        PetOwner user = gson.fromJson(json, PetOwner.class);
        return user;
    }

    public String petOwnerToJSON(PetOwner user){
         Gson gson = new Gson();

        String json = gson.toJson(user, PetOwner.class);
        return json;
    }

    public void updatePetOwner(String username,String personalpage) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE petowners SET personalpage='"+personalpage+"' WHERE username = '"+username+"'";
        stmt.executeUpdate(update);
    }

    public PetOwner databaseToPetOwners(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petowners WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            PetOwner user = gson.fromJson(json, PetOwner.class);
            return user;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String databasePetOwnerToJSON(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petowners WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public void createPetOwnersTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE petowners "
                + "(owner_id INTEGER not NULL AUTO_INCREMENT, "
                + "    username VARCHAR(30) not null unique,"
                + "    email VARCHAR(50) not null unique,	"
                + "    password VARCHAR(32) not null,"
                + "    firstname VARCHAR(30) not null,"
                + "    lastname VARCHAR(30) not null,"
                + "    birthdate DATE not null,"
                + "    gender  VARCHAR (7) not null,"
                + "    country VARCHAR(30) not null,"
                + "    city VARCHAR(50) not null,"
                + "    address VARCHAR(50) not null,"
                + "    personalpage VARCHAR(200) not null,"
                + "    job VARCHAR(200) not null,"
                + "    telephone VARCHAR(14),"
                  + "    lat DOUBLE,"
                + "    lon DOUBLE,"
                + " PRIMARY KEY (owner_id))";
        stmt.execute(query);
        stmt.close();
    }

    /**
     * Establish a database connection and add in the databas
     *
     * @param user
     * @param usere.
     *
     * @throws ClassNotFoundException
     */
    public void addNewPetOwner(PetOwner user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " petowners (username,email,password,firstname,lastname,birthdate,gender,country,city,address,personalpage,"
                    + "job,telephone,lat,lon)"
                    + " VALUES ("
                    + "'" + user.getUsername() + "',"
                    + "'" + user.getEmail() + "',"
                    + "'" + user.getPassword() + "',"
                    + "'" + user.getFirstname() + "',"
                    + "'" + user.getLastname() + "',"
                    + "'" + user.getBirthdate() + "',"
                    + "'" + user.getGender() + "',"
                    + "'" + user.getCountry() + "',"
                    + "'" + user.getCity() + "',"
                    + "'" + user.getAddress() + "',"
                    + "'" + user.getPersonalpage() + "',"
                    + "'" + user.getJob() + "',"
                    + "'" + user.getTelephone() + "',"
                    + "'" + user.getLat() + "',"
                    + "'" + user.getLon() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The pet owner was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditPetOwnersTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     *
     * @return @throws ClassNotFoundException
     * @throws SQLException
     */
    public ArrayList<PetOwner> getAllPetOwners() throws ClassNotFoundException, SQLException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<PetOwner> owners = new ArrayList<>();

        ResultSet rs = stmt.executeQuery("SELECT * FROM petOwners");

        while (rs.next()) {
            String json = DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            PetOwner owner = gson.fromJson(json, PetOwner.class);
            owners.add(owner);
        }

        return owners;
    }

    public void deletePetOwner(String username) throws ClassNotFoundException, SQLException {
        Connection con = null;
        Statement stmt = null;

        try {
            con = DB_Connection.getConnection();
            stmt = con.createStatement();

            String deleteQuery = "DELETE FROM petowners WHERE username = '" + username + "'";
            stmt.executeUpdate(deleteQuery);

            System.out.println("# The pet owner with username '" + username + "' was successfully deleted.");

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(EditPetOwnersTable.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                }
            }
            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                }
            }
        }
    }

    public int FindOwnerId(String username) throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs = null;

        try {

            StringBuilder query = new StringBuilder();

            query.append("SELECT `owner_id` FROM petkeepers WHERE username = '").append(username).append(";");

            rs = stmt.executeQuery(query.toString());

            if (rs.next()) {
                return rs.getInt("owner_id");
            } else {
                return -1;
            }

        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

    }

}
