/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import mainClasses.PetKeeper;
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
public class EditPetKeepersTable {

    // Checks if there is alredy a user with the given username
    public static Boolean checkValidUserName(String username) throws ClassNotFoundException {

        Boolean newValid = true;
        Statement newStatement = null;
        Connection newConnection = null;

        try {

            newConnection = DB_Connection.getConnection();
            newStatement = newConnection.createStatement();

            StringBuilder insQuery = new StringBuilder();

            insQuery.append("SELECT * FROM petkeepers ")
                    .append(" WHERE ")
                    .append(" username = ").append("'").append(username).append("';");

            newStatement.execute(insQuery.toString());

            if (newStatement.getResultSet().next() == true) {
                System.out.println("#DB_ConnectionDB: There is a registered member with this username");
                newValid = false;
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(EditPetKeepersTable.class.getName()).log(Level.SEVERE, null, ex);
        }
        return newValid;
    }

    // Checks if there is alredy a user with the given email
    public static Boolean checkValidEmail(String email) throws ClassNotFoundException {

        Boolean newValid = true;
        Statement newStatement = null;
        Connection newConnection = null;

        try {

            newConnection = DB_Connection.getConnection();
            newStatement = newConnection.createStatement();

            StringBuilder insQuery = new StringBuilder();

            insQuery.append("SELECT * FROM petkeepers ")
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

    // Checks if there is a registered user with the given username and password
    public static Boolean FindRegisteredUser(String username, String password) throws ClassNotFoundException {

        Boolean isValidUser = false;
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            connection = DB_Connection.getConnection();
            statement = connection.createStatement();

            StringBuilder query = new StringBuilder();

            query.append("SELECT * FROM petkeepers ")
                    .append("WHERE username = '").append(username).append("' AND password = '").append(password).append("';");

            resultSet = statement.executeQuery(query.toString());

            // Check if the result set contains at least one row
            if (resultSet.next()) {
                System.out.println("#DB_ConnectionDB: Found a registered user with the given attributes! ");
                isValidUser = true;
            }

        } catch (SQLException ex) {
            // Log exception
            Logger.getLogger(EditPetKeepersTable.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            // Close resources in the reverse order of their creation
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (statement != null) {
                try {
                    statement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

        return isValidUser;
    }

    public void addPetKeeperFromJSON(String json) throws ClassNotFoundException {
         PetKeeper user=jsonToPetKeeper(json);
         addNewPetKeeper(user);
    }

    public PetKeeper jsonToPetKeeper(String json) {
         Gson gson = new Gson();

        PetKeeper user = gson.fromJson(json, PetKeeper.class);
        return user;
    }

    public String petKeeperToJSON(PetKeeper user){
         Gson gson = new Gson();

        String json = gson.toJson(user, PetKeeper.class);
        return json;
    }

    public void printPetKeeperDetails(String username, String password) throws SQLException, ClassNotFoundException{

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;

        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE username = '" + username + "' AND password='"+password+"'");
            while (rs.next()) {
                System.out.println("===Result===");
                DB_Connection.printResults(rs);
            }

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }

    public PetKeeper databaseToPetKeepers(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            PetKeeper user = gson.fromJson(json, PetKeeper.class);
            return user;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<PetKeeper> getAvailableKeepers(String type) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<PetKeeper> keepers = new ArrayList<PetKeeper>();
        ResultSet rs = null;
        try {
            //if(type=="catkeeper")
            if("all".equals(type))     
            rs = stmt.executeQuery("SELECT * FROM `petKeepers` WHERE  `petKeepers`.`keeper_id` not in (select keeper_id "
                 + "from `bookings` where `status`='requested' or  `status`='accepted')\n" +"");
            else if ("catKeepers".equals(type))
                 rs = stmt.executeQuery("SELECT * FROM `petKeepers` WHERE `petKeepers`.`catkeeper`='true' AND `petKeepers`.`keeper_id` not in (select keeper_id "
                 + "from `bookings` where `status`='requested' or  `status`='accepted')");         
             else if ("dogKeepers".equals(type))
                 rs = stmt.executeQuery("SELECT * FROM `petKeepers` WHERE `petKeepers`.`dogkeeper`='true' AND `petKeepers`.`keeper_id` not in (select keeper_id "
                 + "from `bookings` where `status`='requested' or  `status`='accepted')");
        
           
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                PetKeeper keeper = gson.fromJson(json, PetKeeper.class);
                keepers.add(keeper);
            }
            return keepers;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<PetKeeper> getKeepers(String type) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<PetKeeper> keepers = new ArrayList<PetKeeper>();
        ResultSet rs = null;
        try {
            if("catkeeper".equals(type))
                 rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE catkeeper= '" + "true" + "'");
            else if ("dogkeeper".equals(type))
                  rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE dogkeeper= '" + "true" + "'");

           
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                PetKeeper keeper = gson.fromJson(json, PetKeeper.class);
                keepers.add(keeper);
            }
            return keepers;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String databasePetKeeperToJSON(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM petkeepers WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public void createPetKeepersTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE petkeepers "
                + "(keeper_id INTEGER not NULL AUTO_INCREMENT, "
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
                + "    property VARCHAR(10) not null,"
                + "    propertydescription VARCHAR(200),"
                + "    catkeeper VARCHAR(10) not null,"
                + "    dogkeeper VARCHAR(10) not null,"
                + "    catprice INTEGER,"
                + "    dogprice INTEGER,"
                + " PRIMARY KEY (keeper_id))";
        stmt.execute(query);
        stmt.close();
    }
    
    /**
     * Establish a database connection and add in the database.
     *
     * @param user
     * @throws ClassNotFoundException
     */
    public void addNewPetKeeper(PetKeeper user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " petkeepers (username,email,password,firstname,lastname,birthdate,gender,country,city,address,personalpage,"
                    + "job,telephone,lat,lon,property,propertydescription,catkeeper,dogkeeper,catprice,dogprice)"
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
                    + "'" + user.getLon() + "',"
                    + "'" + user.getProperty() + "',"
                    + "'" + user.getPropertydescription()+ "',"
                    + "'" + user.getCatkeeper() + "',"
                    + "'" + user.getDogkeeper() + "',"
                    + "'" + user.getCatprice() + "',"
                    + "'" + user.getDogprice() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The pet owner was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditPetKeepersTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     *
     * @param username
     * @param password
     * @param firstname
     * @param lastname
     * @param birthdate
     * @param gender
     * @param country
     * @param city
     * @param address
     * @param telephone
     * @param personalpage
     * @param job
     * @param lat
     * @param lon
     * @param property
     * @param propertydescription
     * @param catkeeper
     * @param dogkeeper
     * @param catprice
     * @param dogprice
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public void updatePetKeeper(String username, String password, String firstname, String lastname, String birthdate, String gender, String country, String city, String address, String telephone, String personalpage, String job, Double lat, Double lon, String property, String propertydescription, String catkeeper, String dogkeeper, int catprice, int dogprice)
            throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String update = "UPDATE petkeepers SET "
                + "password='" + password + "',"
                + "firstname='" + firstname + "',"
                + "lastname='" + lastname + "',"
                + "birthdate='" + birthdate + "',"
                + "gender='" + gender + "',"
                + "country='" + country + "',"
                + "city='" + city + "',"
                + "address='" + address + "',"
                + "telephone='" + telephone + "',"
                + "personalpage='" + personalpage + "',"
                + "job='" + job + "',"
                + "lat=" + lat + ","
                + "lon=" + lon + ","
                + "property='" + property + "',"
                + "propertydescription='" + propertydescription + "',"
                + "catkeeper=" + catkeeper + ","
                + "dogkeeper=" + dogkeeper + ","
                + "catprice=" + catprice + ","
                + "dogprice=" + dogprice
                + " WHERE username = '" + username + "'";

        stmt.executeUpdate(update);
    }

    public ArrayList<PetKeeper> getAllPetKeepers() throws ClassNotFoundException, SQLException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<PetKeeper> keepers = new ArrayList<>();

        ResultSet rs = stmt.executeQuery("SELECT * FROM petKeepers");

        while (rs.next()) {
            String json = DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            PetKeeper keeper = gson.fromJson(json, PetKeeper.class);
            keepers.add(keeper);
        }

        return keepers;
    }

    /**
     *
     * @param username
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    public void deletePetKeeper(String username) throws ClassNotFoundException, SQLException {
        Connection con = null;
        Statement stmt = null;

        try {
            con = DB_Connection.getConnection();
            stmt = con.createStatement();

            String deleteQuery = "DELETE FROM petkeepers WHERE username = '" + username + "'";
            stmt.executeUpdate(deleteQuery);

            System.out.println("# The pet keeper with username '" + username + "' was successfully deleted.");

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

    public int FindKeeperId(String username) throws ClassNotFoundException, SQLException {

        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            connection = DB_Connection.getConnection();
            statement = connection.createStatement();

            StringBuilder query = new StringBuilder();

            query.append("SELECT `keeper_id` FROM petkeepers WHERE username = '").append(username).append("';");

            resultSet = statement.executeQuery(query.toString());

            if (resultSet.next()) {
                return resultSet.getInt("keeper_id");
            } else {
                return -1;
            }

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (statement != null) {
                try {
                    statement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
