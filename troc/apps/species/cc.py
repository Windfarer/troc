from opencc import OpenCC

s2t_cc = OpenCC('s2t')

s2t = lambda x: s2t_cc.convert(x)