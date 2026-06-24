"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

import {
    FaUsers,
    FaTrash,
    FaUserShield,
    FaUserTie,
    FaUser,
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

const ManageUsersPage = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const usersPerPage = 10;
    // ==========================
    // FETCH USERS
    // ==========================

    const fetchUsers = async () => {
        try {
            const res =
                await axios.get(
                    "http://localhost:5000/users"
                );

            setUsers(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchUsers();
        };
        loadData();
    }, []);


    // ==========================
    // SEARCH FILTER
    // ==========================

    const filteredUsers =
        useMemo(() => {
            return users.filter(
                (user) =>
                    user.name
                        ?.toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        ) ||
                    user.email
                        ?.toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        )
            );
        }, [users, searchTerm]);

    // ==========================
    // PAGINATION
    // ==========================

    const totalPages =
        Math.ceil(
            filteredUsers.length /
            usersPerPage
        ) || 1;

    const indexOfLastUser =
        currentPage *
        usersPerPage;

    const indexOfFirstUser =
        indexOfLastUser -
        usersPerPage;

    const currentUsers =
        filteredUsers.slice(
            indexOfFirstUser,
            indexOfLastUser
        );

    // ==========================
    // STATS
    // ==========================

    const totalAdmins =
        users.filter(
            (u) =>
                u.role === "admin"
        ).length;

    const totalLawyers =
        users.filter(
            (u) =>
                u.role === "lawyer"
        ).length;

    const totalClients =
        users.filter(
            (u) =>
                u.role === "client"
        ).length;

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setCurrentPage(1);
        }, 300); // Waits 300ms after the last keystroke

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // ==========================
    // CHANGE USER ROLE
    // ==========================

    const handleRoleChange =
        async (id, role) => {

            const result =
                await Swal.fire({
                    title:
                        "Change Role?",
                    text: `Make user ${role}?`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor:
                        "#D4A95A",
                    confirmButtonText:
                        "Yes, Change",
                });

            if (!result.isConfirmed)
                return;

            try {
                const res =
                    await axios.patch(
                        `http://localhost:5000/users/role/${id}`,
                        { role }
                    );

                if (
                    res.data.success
                ) {
                    Swal.fire({
                        title:
                            "Updated!",
                        text:
                            "Role updated successfully.",
                        icon:
                            "success",
                        timer: 1500,
                        showConfirmButton:
                            false,
                    });

                    fetchUsers();
                }
            } catch (error) {
                console.log(error);

                Swal.fire(
                    "Error",
                    "Failed to update role.",
                    "error"
                );
            }
        };

    // ==========================
    // DELETE USER
    // ==========================

    const handleDelete =
        async (id) => {

            const result =
                await Swal.fire({
                    title:
                        "Delete User?",
                    text:
                        "This action cannot be undone.",
                    icon:
                        "warning",
                    showCancelButton:
                        true,
                    confirmButtonColor:
                        "#dc2626",
                    confirmButtonText:
                        "Delete",
                });

            if (!result.isConfirmed)
                return;

            try {
                const res =
                    await axios.delete(
                        `http://localhost:5000/users/${id}`
                    );

                if (
                    res.data.success
                ) {
                    Swal.fire({
                        title:
                            "Deleted!",
                        text:
                            "User removed successfully.",
                        icon:
                            "success",
                        timer: 1500,
                        showConfirmButton:
                            false,
                    });

                    fetchUsers();
                }
            } catch (error) {
                console.log(error);

                Swal.fire(
                    "Error",
                    "Failed to delete user.",
                    "error"
                );
            }
        };

    // ==========================
    // LOADING SCREEN
    // ==========================

    if (loading) {
        return (
            <div
                className="
                min-h-screen
                flex
                justify-center
                items-center
                bg-[#F7F3EE]
                "
            >
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat:
                            Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="
                    w-16
                    h-16
                    border-4
                    border-[#D4A95A]
                    border-t-transparent
                    rounded-full
                    "
                />
            </div>
        );
    }

    return (
        <div
            className="
            min-h-screen
            bg-gradient-to-br
            from-[#FDF8EF]
            via-[#FFFDF8]
            to-[#F5EAD5]
            p-4
            md:p-6
            lg:p-10
            "
        >
            {/* Header */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: -30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="mb-8"
            >
                <h1
                    className="
                    text-4xl
                    md:text-5xl
                    font-bold
                    text-[#2B2118]
                    "
                >
                    Manage Users
                </h1>

                <p
                    className="
                    text-gray-600
                    mt-3
                    "
                >
                    Manage all platform users,
                    permissions and roles.
                </p>
            </motion.div>

            {/* Main Stats Card */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.95,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="
                bg-gradient-to-r
                from-[#D4A95A]
                via-[#C89A48]
                to-[#B88A44]
                rounded-3xl
                p-6
                md:p-8
                text-white
                shadow-2xl
                mb-8
                "
            >
                <div
                    className="
                    flex
                    items-center
                    gap-5
                    "
                >
                    <FaUsers
                        className="
                        text-5xl
                        "
                    />

                    <div>
                        <h2
                            className="
                            text-4xl
                            font-bold
                            "
                        >
                            {users.length}
                        </h2>

                        <p>
                            Total Registered Users
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Role Statistics */}

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-5
                mb-8
                "
            >
                <motion.div
                    whileHover={{
                        y: -5,
                    }}
                    className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-lg
                    "
                >
                    <h3
                        className="
                        text-gray-500
                        mb-2
                        "
                    >
                        Admins
                    </h3>

                    <p
                        className="
                        text-4xl
                        font-bold
                        text-red-500
                        "
                    >
                        {totalAdmins}
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{
                        y: -5,
                    }}
                    className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-lg
                    "
                >
                    <h3
                        className="
                        text-gray-500
                        mb-2
                        "
                    >
                        Lawyers
                    </h3>

                    <p
                        className="
                        text-4xl
                        font-bold
                        text-yellow-600
                        "
                    >
                        {totalLawyers}
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{
                        y: -5,
                    }}
                    className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-lg
                    "
                >
                    <h3
                        className="
                        text-gray-500
                        mb-2
                        "
                    >
                        Clients
                    </h3>

                    <p
                        className="
                        text-4xl
                        font-bold
                        text-blue-500
                        "
                    >
                        {totalClients}
                    </p>
                </motion.div>
            </div>

            {/* Search Box */}

            <div
                className="
                bg-white
                rounded-3xl
                shadow-lg
                p-5
                mb-8
                "
            >
                <div
                    className="
                    relative
                    "
                >
                    <FaSearch
                        className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        "
                    />

                    <input
                        type="text"
                        value={
                            searchTerm
                        }
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                        placeholder="Search by name or email..."
                        className="
                        input
                        input-bordered
                        w-full
                        pl-12
                        "
                    />
                </div>
            </div>
            <div
                className="
                bg-white
                rounded-3xl
                shadow-xl
                overflow-hidden
                border
                border-[#F3E3C7]
                "
            >
                {/* Desktop Table */}

                <div className="hidden lg:block overflow-x-auto">

                    <table className="table w-full">

                        <thead
                            className="
                            bg-[#FFF8EC]
                            sticky
                            top-0
                            z-10
                            "
                        >
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Role</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>

                            <AnimatePresence>

                                {currentUsers.map(
                                    (
                                        user,
                                        index
                                    ) => (

                                        <motion.tr
                                            key={
                                                user._id
                                            }
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                            }}
                                            transition={{
                                                delay:
                                                    index *
                                                    0.05,
                                            }}
                                            className="
                                            hover
                                            "
                                        >
                                            <td
                                                className="
                                                font-semibold
                                                "
                                            >
                                                {
                                                    user.name
                                                }
                                            </td>

                                            <td>
                                                {
                                                    user.email
                                                }
                                            </td>

                                            <td>

                                                <span
                                                    className={`
                                                    badge
                                                    ${user.role ===
                                                            "admin"
                                                            ? "badge-error"
                                                            : user.role ===
                                                                "lawyer"
                                                                ? "badge-warning"
                                                                : "badge-info"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        user.role
                                                    }
                                                </span>

                                            </td>

                                            <td>

                                                <div
                                                    className="
                                                    flex
                                                    flex-wrap
                                                    gap-2
                                                    "
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleRoleChange(
                                                                user._id,
                                                                "client"
                                                            )
                                                        }
                                                        className="
                                                        btn
                                                        btn-sm
                                                        btn-info
                                                        "
                                                    >
                                                        Client
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleRoleChange(
                                                                user._id,
                                                                "lawyer"
                                                            )
                                                        }
                                                        className="
                                                        btn
                                                        btn-sm
                                                        btn-warning
                                                        "
                                                    >
                                                        Lawyer
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleRoleChange(
                                                                user._id,
                                                                "admin"
                                                            )
                                                        }
                                                        className="
                                                        btn
                                                        btn-sm
                                                        btn-error
                                                        "
                                                    >
                                                        Admin
                                                    </button>
                                                </div>

                                            </td>

                                            <td>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            user._id
                                                        )
                                                    }
                                                    className="
                                                    btn
                                                    btn-sm
                                                    btn-error
                                                    "
                                                >
                                                    <FaTrash />
                                                </button>

                                            </td>

                                        </motion.tr>
                                    )
                                )}

                            </AnimatePresence>

                        </tbody>

                    </table>

                </div>

                {/* Mobile Cards */}

                <div
                    className="
                    lg:hidden
                    p-5
                    space-y-4
                    "
                >
                    <AnimatePresence>

                        {currentUsers.map(
                            (
                                user,
                                index
                            ) => (

                                <motion.div
                                    key={
                                        user._id
                                    }
                                    initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                    transition={{
                                        delay:
                                            index *
                                            0.05,
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    className="
                                    bg-[#FFFDF8]
                                    border
                                    border-[#F3E3C7]
                                    rounded-3xl
                                    p-5
                                    "
                                >
                                    <div
                                        className="
                                        flex
                                        items-center
                                        gap-3
                                        mb-4
                                        "
                                    >
                                        {user.role ===
                                            "admin" ? (
                                            <FaUserShield
                                                className="
                                                text-red-500
                                                text-2xl
                                                "
                                            />
                                        ) : user.role ===
                                            "lawyer" ? (
                                            <FaUserTie
                                                className="
                                                text-yellow-600
                                                text-2xl
                                                "
                                            />
                                        ) : (
                                            <FaUser
                                                className="
                                                text-blue-500
                                                text-2xl
                                                "
                                            />
                                        )}

                                        <div>
                                            <h3
                                                className="
                                                font-bold
                                                "
                                            >
                                                {
                                                    user.name
                                                }
                                            </h3>

                                            <p
                                                className="
                                                text-sm
                                                text-gray-500
                                                break-all
                                                "
                                            >
                                                {
                                                    user.email
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="
                                        mb-4
                                        "
                                    >
                                        <span
                                            className={`
                                            badge
                                            ${user.role ===
                                                    "admin"
                                                    ? "badge-error"
                                                    : user.role ===
                                                        "lawyer"
                                                        ? "badge-warning"
                                                        : "badge-info"
                                                }
                                            `}
                                        >
                                            {
                                                user.role
                                            }
                                        </span>
                                    </div>

                                    <div
                                        className="
                                        grid
                                        grid-cols-2
                                        gap-2
                                        "
                                    >
                                        <button
                                            onClick={() =>
                                                handleRoleChange(
                                                    user._id,
                                                    "client"
                                                )
                                            }
                                            className="
                                            btn
                                            btn-sm
                                            btn-info
                                            "
                                        >
                                            Client
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleRoleChange(
                                                    user._id,
                                                    "lawyer"
                                                )
                                            }
                                            className="
                                            btn
                                            btn-sm
                                            btn-warning
                                            "
                                        >
                                            Lawyer
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleRoleChange(
                                                    user._id,
                                                    "admin"
                                                )
                                            }
                                            className="
                                            btn
                                            btn-sm
                                            btn-error
                                            "
                                        >
                                            Admin
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    user._id
                                                )
                                            }
                                            className="
                                            btn
                                            btn-sm
                                            btn-outline
                                            btn-error
                                            "
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </motion.div>
                            )
                        )}

                    </AnimatePresence>

                    {currentUsers.length ===
                        0 && (
                            <div
                                className="
                            text-center
                            py-16
                            "
                            >
                                <FaUsers
                                    className="
                                mx-auto
                                text-6xl
                                text-gray-300
                                mb-4
                                "
                                />

                                <h3
                                    className="
                                text-xl
                                font-bold
                                "
                                >
                                    No Users Found
                                </h3>

                                <p
                                    className="
                                text-gray-500
                                "
                                >
                                    Try another search.
                                </p>
                            </div>
                        )}
                </div>
            </div>
            {/* Pagination */}

            <div
                className="
                mt-8
                flex
                flex-col
                md:flex-row
                items-center
                justify-between
                gap-4
                "
            >
                {/* User Info */}

                <div
                    className="
                    text-sm
                    text-gray-600
                    "
                >
                    Showing{" "}
                    <span
                        className="
                        font-semibold
                        "
                    >
                        {filteredUsers.length === 0
                            ? 0
                            : indexOfFirstUser + 1}
                    </span>

                    {" "}to{" "}

                    <span
                        className="
                        font-semibold
                        "
                    >
                        {Math.min(
                            indexOfLastUser,
                            filteredUsers.length
                        )}
                    </span>

                    {" "}of{" "}

                    <span
                        className="
                        font-semibold
                        "
                    >
                        {filteredUsers.length}
                    </span>

                    {" "}users
                </div>

                {/* Pagination Buttons */}

                <div
                    className="
                    flex
                    items-center
                    gap-2
                    flex-wrap
                    "
                >
                    <button
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage - 1
                            )
                        }
                        className="
                        btn
                        btn-sm
                        btn-outline
                        "
                    >
                        <FaChevronLeft />
                    </button>

                    {Array.from(
                        {
                            length:
                                totalPages,
                        },
                        (_, i) => (
                            <button
                                key={i}
                                onClick={() =>
                                    setCurrentPage(
                                        i + 1
                                    )
                                }
                                className={`
                                btn
                                btn-sm
                                ${currentPage ===
                                        i + 1
                                        ? "btn-warning"
                                        : "btn-outline"
                                    }
                                `}
                            >
                                {i + 1}
                            </button>
                        )
                    )}

                    <button
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage + 1
                            )
                        }
                        className="
                        btn
                        btn-sm
                        btn-outline
                        "
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ManageUsersPage;