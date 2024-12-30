import { faClipboard, faPersonCircleQuestion, faQuestion, faQuestionCircle, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="w-48 border-r border-slate-300">
            <nav>
                <div className="sidebar-title text-2xl font-semibold p-3">Menu</div>
                <ul>
                    <li>
                        <Link className="block p-3 hover:bg-blue-700 hover:text-white" to="/manager/quiz">
                        <FontAwesomeIcon icon={faPersonCircleQuestion} className="mr-2" />
                        Quiz Management
                        </Link>
                    </li>
                    <li>
                        <Link className="block p-3 hover:bg-blue-700 hover:text-white" to="/manager/question">
                        <FontAwesomeIcon icon={faQuestion} className="mr-2" />
                        Question Management
                        </Link>
                    </li>
                    <li>
                        <Link className="block p-3 hover:bg-blue-700 hover:text-white" to="/manager/user">
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        User Management
                        </Link>
                    </li>
                    <li>
                        <Link className="block p-3 hover:bg-blue-700 hover:text-white" to="/manager/role">
                        <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                        Role Management
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;