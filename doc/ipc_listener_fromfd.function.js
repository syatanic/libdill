
newFunction(
    {
        name: "ipc_listener_fromfd",
        info: "wraps an existing OS-level file descriptor",

        result: {
            type: "int",
            success: "newly created socket handle",
            error: "-1",
        },
        args: [
            {
                name: "fd",
                type: "int",
                info: "File descriptor of a listening UNIX domain socket to wrap.",
            },
        ],

        protocol: ipc_protocol,

        prologue: `
            This function wraps an existing OS-level file descriptor.
        `,
        epilogue: `
            The socket can be cleanly shut down using **ipc_close** function
            which will also close the underlying file descriptor.

            There's no way to unwrap the file descriptor.
        `,

        allocates_handle: true,
        mem: "ipc_listener_storage",

        example: `
            int fd = socket(AF_UNIX, SOCK_STREAM, 0);
            bind(fd, addr, sizeof(addr));
            listen(fd, 10);
            int s = ipc_listener_fromfd(fd);
        `
    },
)