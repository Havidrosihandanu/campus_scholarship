const db = require("../../config/db");
const bcrypt = require("bcrypt");
exports.setting = (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [1], (err, result) => {
    if (err) {
      console.error(err);
      return res.render("dashboard/setting", {
        layout: "./layouts/dashboard",
        setting: null,
        title: "Pengaturan",
        currentPage: "setting",
        error: "Failed to retrieve user data.",
      });
    }

    if (result.length === 0) {
      return res.render("dashboard/setting", {
        layout: "./layouts/dashboard",
        setting: null,
        title: "Pengaturan",
        currentPage: "setting",
        error: "User not found.",
      });
    }

    const dataUser = result[0];
    console.log(dataUser);

    res.render("dashboard/setting", {
      layout: "./layouts/dashboard",
      setting: dataUser,
      title: "Pengaturan",
      currentPage: "setting",
    });
  });
};

// Example of how you would fetch the user and compare the password
exports.updateSetting = (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = 1;

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).render("dashboard/setting", {
        layout: "./layouts/dashboard",
        title: "Pengaturan",
        currentPage: "setting",
        error: "Error fetching user data.",
      });
    }

    const user = result[0];
    if (!user) {
      return res.status(404).render("dashboard/setting", {
        layout: "./layouts/dashboard",
        title: "Pengaturan",
        currentPage: "setting",
        error: "User not found.",
      });
    }
    // Compare old password
    bcrypt.compare(oldPassword, user.password_hash, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).render("dashboard/setting", {
          layout: "./layouts/dashboard",
          title: "Pengaturan",
          currentPage: "setting",
          error: "Error comparing passwords.",
          setting: user,
        });
      }
      
      if (!isMatch) {
        return res.redirect(`/dashboard/setting?error=${encodeURIComponent("Password lama tidak cocok.")}`);
      }

      // Check new password matches confirmation
      if (newPassword !== confirmPassword) {
        return res.redirect(`/dashboard/setting?error=${encodeURIComponent("Password baru dan konfirmasi tidak cocok.")}`);
      }
      
      // Hash new password
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).render("dashboard/setting", {
            layout: "./layouts/dashboard",
            title: "Pengaturan",
            currentPage: "setting",
            error: "Error hashing password.",
            setting: user,
          });
        }
        
        console.log(user.password_hash, oldPassword, newPassword, confirmPassword);
        // Update the password in the database
        db.query(
          "UPDATE users SET password_hash = ? WHERE id = ?",
          [hashedPassword, userId],
          (err) => {
            if (err) {
              console.error(err);
              return res.redirect(`/dashboard/setting?error=${encodeURIComponent("Error updating password.")}`);
            }

            return res.redirect("/dashboard/setting?success=true");
          }
        );
      });
    });
  });
};