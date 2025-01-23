def gcd(a, b):
    """ หาค่า GCD (Greatest Common Divisor) """
    while b != 0:
        a, b = b, a % b
    return a

def mod_inverse(e, phi_n):
    """ หา d (modular inverse ของ e mod φ(n)) โดยใช้ Extended Euclidean Algorithm """
    a, b = e, phi_n
    x0, x1, y0, y1 = 1, 0, 0, 1

    while b != 0:
        q = a // b
        a, b = b, a % b
        x0, x1 = x1, x0 - q * x1
        y0, y1 = y1, y0 - q * y1

    if a != 1:
        return None  # ไม่มี modular inverse
    return x0 % phi_n

def calculate_rsa_parameters(p, q, e):
    """ คำนวณค่า n, φ(n), และ d สำหรับ RSA """
    n = p * q
    phi_n = (p - 1) * (q - 1)

    if gcd(e, phi_n) != 1:
        return "❌ Error: e และ φ(n) ต้องเป็น coprime (GCD = 1)!"

    d = mod_inverse(e, phi_n)

    if d is None:
        return "❌ Error: ไม่สามารถหา d ได้! กรุณาเลือกค่า e ใหม่"

    return {"p": p, "q": q, "n": n, "φ(n)": phi_n, "e": e, "d": d}

# 🔹 ทดสอบการคำนวณ
p = 61  # จำนวนเฉพาะตัวที่ 1
q = 53  # จำนวนเฉพาะตัวที่ 2
e = 2552  # ค่า Public Exponent ที่ใช้

rsa_params = calculate_rsa_parameters(p, q, e)

print("🔹 ค่าที่คำนวณได้:")
print(rsa_params)
