if __name__ == "__main__":
    import sys
    args = sys.argv[1:]
    if len(args) != 0:
        print("This script requires no command-line argument")
        exit(1)
    import ml_test 
    ml_test_app = ml_test.create_app()
    ml_test_app.run(debug=True)
else:
    raise ImportError("Need to run this file directly, don't import")