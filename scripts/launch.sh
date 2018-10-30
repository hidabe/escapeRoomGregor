xmodmap -e "keycode 37 = Escape";
xmodmap -e "keycode 105 = Escape";
xmodmap -e "keycode 133 = Escape";
xmodmap -e "keycode 134 = Escape";
xmodmap -e "keycode 67 = Escape";

/usr/bin/chromium-browser --kiosk --noerrordialogs --incognito --disable-infobars --disable-session-crashed-bubble http://localhost/escapeRoomGregor/
